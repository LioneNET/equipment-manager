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
                    "id" => $create->id,
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
    public static function createRegExp(string $mask): string
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
