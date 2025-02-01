<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class UniqueSerialNumbers implements Rule
{
    public function passes($attribute, $value): bool
    {
        $currentSerialNumbers = [];

        // Проверяем, является ли значение массивом
        if (!is_array($value)) {
            return false;
        }

        foreach ($value as $items) {
            // Извлекаем все serial_number из текущего equipment_items
            $currentSerialNumbers = array_merge($currentSerialNumbers, array_column($items['equipment_items'], 'serial_number'));
        }

        // Проверяем, есть ли пересечение с уже известными serial_numbers
        return collect($currentSerialNumbers)->duplicates()->isEmpty();
    }

    public function message(): string
    {
        return 'Серийные номера оборудования не должен повторяться';
    }
}
