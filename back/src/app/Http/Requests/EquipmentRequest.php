<?php

namespace App\Http\Requests;

use App\Models\Equipment;
use App\Models\EquipmentType;
use App\Rules\UniqueSerialNumbers;
use App\Services\Equipment\EquipmentService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class EquipmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Проверка входящего массива данных
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            "equipments.*" => "required_array_keys:equipment_type,equipment_items",
            "equipments.*.equipment_type" => [
                'required',
                'integer',
                Rule::exists(EquipmentType::class, 'id')
            ],
            "equipments" => [
                'required',
                'array',
                new UniqueSerialNumbers()
            ],
            "equipments.*.equipment_items.*" => [
                "required_array_keys:serial_number,note"
            ],
            "equipments.*.equipment_items.*.serial_number" => [
                "required",
                "string",
                Rule::unique(Equipment::class, 'serial')
            ]
        ];
    }

    public function attributes(): array
    {
        return [
            'equipments.*.equipment_items.*.serial_number' => 'Серийный номер'
        ];
    }

    public function messages(): array
    {
        return [
            'equipments.*.equipment_items.*.serial_number.unique' => ':attribute ":input" уже есть в базе'
        ];
    }

    /**
     * @throws ValidationException
     */
    protected function passedValidation(): void
    {
        $this->validateEquipments();
        if (!$this->validator->errors()->isEmpty()) {
            throw new ValidationException($this->getValidatorInstance());
        }
    }

    private function validateEquipments(): void
    {
        $equipment_type = collect($this->equipments)->pluck('equipment_type')->all();
        $equipmentType = EquipmentType::query()->whereIn('id', $equipment_type)->get()->keyBy('id');

        foreach ($this->equipments as $equipment_key => $equipment) {
            foreach ($equipment['equipment_items'] as $equipment_item_key => $equipment_item) {
                /** @var EquipmentType $type */
                $type = $equipmentType[$equipment['equipment_type']];

                if (!preg_match(EquipmentService::createRegExp($type->serial_mask), $equipment_item['serial_number'])) {
                    $this->validator->errors()->add(
                        "equipment.$equipment_key.item.$equipment_item_key",
                        "Серийный номер {$equipment_item['serial_number']} не соответствует маске оборудования!"
                    );
                }
            }
        }
    }
}
