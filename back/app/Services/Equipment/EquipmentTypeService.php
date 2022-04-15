<?php

namespace App\Services\Equipment;

use App\Models\EquipmentType;
use Illuminate\Http\Request;

class EquipmentTypeService
{
  public function getEquipments(Request $request)
  {
    $equipment = EquipmentType::query();
    $request->whenFilled('id', function ($q) use ($equipment) {
      $equipment->where('id', '=', $q);
    });
    $request->whenFilled('name', function ($q) use ($equipment) {
      $equipment->where('name', 'LIKE', '%' . $q . '%');
    });
    $request->whenFilled('serial_mask', function ($q) use ($equipment) {
      $equipment->where('note', 'LIKE', '%' . $q . '%');
    });
    return $equipment->paginate($request->input('limit'));
  }
}
