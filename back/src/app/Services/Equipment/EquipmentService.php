<?php

namespace App\Services\Equipment;

use App\Models\Equipment;
use App\Models\EquipmentType;
use Illuminate\Http\Request;
use Exception;

class EquipmentService
{
  /**
   * поиск оборудования
   */
  public function getEquipments(Request $request)
  {
    $equipment = Equipment::query();
    $request->whenFilled('id', function ($q) use ($equipment) {
      $equipment->where('id', '=', $q);
    });
    $request->whenFilled('serial', function ($q) use ($equipment) {
      $equipment->where('serial', 'LIKE', '%' . $q . '%');
    });
    $request->whenFilled('note', function ($q) use ($equipment) {
      $equipment->where('note', 'LIKE', '%' . $q . '%');
    });
    $request->whenFilled('equipment_id', function ($q) use ($equipment) {
      $equipment->where('equipment_id', '=', $q);
    });
    /*
    * для будущей реализации
    $request->whenFilled('equipment_type', function ($query) use ($equipment) {
      $equipment->whereRelation('equipmentType', 'name', 'LIKE', '%' . $query . '%');
    });*/
    return $equipment->paginate($request->input('limit'));
  }

  /**
   * Создание
   */
  public function createEquipments(Request $request)
  {
    $response = [];
    $equipmentSerials = [];
    $equipmentTypeIds = [];
    $data = $request->get('equipments');
    if (is_array($data)) {

      //Групировка серийных номеров по оборудованию
      foreach ($data as $val) {
        $equipmentTypeIds[] = $val['equipment_type'];
        if (array_key_exists($val['equipment_type'], $equipmentSerials)) {
          $equipmentSerials[$val['equipment_type']] = array_merge($equipmentSerials[$val['equipment_type']], $val['equipment_items']);
        } else {
          $equipmentSerials[$val['equipment_type']] = $val['equipment_items'];
        }
      }

      $equipmentTypes = EquipmentType::whereIn("id", $equipmentTypeIds)->get()->keyBy('id');

      //типы оборудования
      foreach ($equipmentTypes as $id => $equipmentTypeItem) {
        //серийне номера для данного типа
        foreach ($equipmentSerials[$id] as $serialAndNote) {
          //проверка серийного номера
          if (preg_match($this->createRegExp($equipmentTypeItem->serial_mask), $serialAndNote['serial_number'])) {
            try {
              $create = Equipment::create([
                "equipment_id" => $id,
                "serial" => $serialAndNote['serial_number'],
                "note" => $serialAndNote['note']
              ]);
              $create->save();
              $response[] = [
                "equipment_type_id" => $id,
                "serial_number" => $serialAndNote['serial_number'],
                "status" => "success",
                "message" => "Серийный номер успешно добавлен"
              ];
            } catch (Exception $exception) {
              $response[] = [
                "equipment_type_id" => $id,
                "serial_number" => $serialAndNote['serial_number'],
                "status" => "error",
                "message" => "Серийный номер уже существует"
              ];
            }
          } else {
            $response[] = [
              "equipment_type_id" => $id,
              "serial_number" => $serialAndNote['serial_number'],
              "status" => "error",
              "message" => "Серийный номер {$serialAndNote['serial_number']} не соответствует маске оборудования"
            ];
          }
        }
      }
      return $response;
    }
  }

  /**
   * обновление данных
   *
   * @return array|null
   */
  public function updateEquipments(Request $request)
  {
    $id = $request->route('id');
    $equipmentTypeId = $request->get('equipment_type_id');
    $serial = $request->get('serial');
    $note = $request->get('note');
    $errors = false;
    $equepment = Equipment::find($id);
    $equipmentType = EquipmentType::find($equipmentTypeId);

    if (!$equepment) {
      return null;
    }

    if (preg_match(self::createRegExp($equipmentType->serial_mask), $serial)) {
      if ($equepment->serial !== $serial) {
        $serialCheck = Equipment::where('serial', $serial)->get()->toArray();
        if (!count($serialCheck)) {
          $equepment->serial = $serial;
        } else {
          $errors = ['error' => "Серийный номер уже есть в базе"];
        }
      }
      $equepment->equipment_id = $equipmentTypeId;
      $equepment->note = $note ?? $equepment->note;
      if (!$errors) {
        $equepment->save();
        return ['success' => 'Данные обновлены!'];
      }
    } else {
      return ['danger' => "Серйиный номер {$serial} не соответствует маске оборудования!"];
    }
    return $errors;
  }

  /**
   * Удаление
   */
  public function deleteEquipment(Request $request)
  {
    Equipment::where('id', $request->route('id'))->delete();
    return ['success' => 'Оборудование удалено'];
  }

  /**
   * Создает регулярное выражение, согласно входной маске
   * N – цифра  от 0 до 9
   * A – прописная  буква латинского  алфавита
   * a – строчная буква латинского  алфавита
   * X – прописная  буква латинского  алфавита  либо цифра  от 0 до 9
   * Z –символ  из списка: “-“, “_”, “@”.
   *
   * @param  string  $mask маска
   * @return string сформированное регулярное
   */
  public static function createRegExp($mask)
  {
    $serialValidateExp = [
      "N" => "[0-9]",
      "A" => "[A-Z]",
      "a" => "[a-z]",
      "X" => "[A-Z0-9]",
      "Z" => "(-|_|@)"
    ];
    //разделяем маску
    $serialMask = str_split($mask);
    $regex = "%^";
    //формируем регулярное выражение
    foreach ($serialMask as $symbol) {
      $regex .= $serialValidateExp[$symbol];
    }
    $regex .= "$%";
    return $regex;
  }
}
