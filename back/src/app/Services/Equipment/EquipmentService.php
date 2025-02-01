<?php

namespace App\Services\Equipment;

use App\Models\Equipment;
use App\Models\EquipmentType;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Exception;

class EquipmentService
{
    /**
     * Поиск оборудования
     */
    public function getEquipments(Request $request): LengthAwarePaginator
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
    public function createEquipments(array $request): array
    {
        $response = [];

        //типы оборудования
        foreach ($request['equipments'] as $equipment) {
            //серийные номера для данного типа
            foreach ($equipment['equipment_items'] as $equipment_item) {
                $create = Equipment::query()->create([
                    "equipment_id" => $equipment['equipment_type'],
                    "serial" => $equipment_item['serial_number'],
                    "note" => $equipment_item['note']
                ]);
                $create->save();
                $response[] = [
                    "equipment_type_id" => $equipment['equipment_type'],
                    "serial_number" => $equipment_item['serial_number'],
                    "status" => "success",
                    "message" => "Серийный номер успешно добавлен"
                ];
            }
        }
        return $response;
    }

    /**
     * Создает регулярное выражение, согласно входной маске
     * N – цифра  от 0 до 9
     * A – прописная  буква латинского  алфавита
     * a – строчная буква латинского  алфавита
     * X – прописная  буква латинского  алфавита  либо цифра  от 0 до 9
     * Z –символ  из списка: “-“, “_”, “@”.
     *
     * @param string $mask маска
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
