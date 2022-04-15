<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
      "id" => "required|integer|exists:App\Models\Equipment,id",
      "equipment_type_id" => "required|integer|exists:App\Models\EquipmentType,id",
      "serial" => "required|string"
    ];
  }
}
