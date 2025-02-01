<?php

namespace App\Http\Requests;

use App\Models\Equipment;
use App\Models\EquipmentType;
use App\Rules\SerialNumberMaskRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EquipmentUpdateRequest extends FormRequest
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
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "equipment_type_id" => [
                'required',
                Rule::exists(EquipmentType::class, 'id')
            ],
            "serial" => [
                "required",
                "string",
                Rule::unique(Equipment::class, 'serial')->ignore($this->equipment),
                new SerialNumberMaskRule($this->equipment_type_id)
            ],
            'note' => [
                'nullable',
                'string'
            ]
        ];
    }

    public function attributes(): array
    {
        return [
            'serial' => 'Серийный номер'
        ];
    }

    public function messages(): array
    {
        return [
            'serial.unique' => ':attribute ":input" уже есть в базе'
        ];
    }
}
