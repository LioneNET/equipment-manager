<?php

namespace App\Rules;

use App\Models\EquipmentType;
use App\Services\Equipment\EquipmentService;
use Illuminate\Contracts\Validation\Rule;

class SerialNumberMaskRule implements Rule
{
    private EquipmentType|null $equipmentType;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(?int $equipment_type = null)
    {
        $this->equipmentType = EquipmentType::find($equipment_type);
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return $this->equipmentType && preg_match(EquipmentService::createRegExp($this->equipmentType->serial_mask), $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Серийный номер ":input" не соответствует маске оборудования!';
    }
}
