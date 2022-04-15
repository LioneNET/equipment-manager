<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;

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
      "equipments.*.equipment_type" => "required|integer",
      "equipments.*.equipment_items.*" => "required_array_keys:serial_number,note",
      "equipments.*.equipment_items.*.serial_number" => "required|string|min:1"
    ];
  }
}
