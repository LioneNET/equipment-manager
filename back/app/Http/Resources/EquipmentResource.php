<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EquipmentResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    if ($this->resource == null) {
      return [];
    }

    return [
      'id' => $this->id,
      'equipment_id' => $this->equipment_id,
      'equipment_type' => $this->equipmentType ? EquipmentTypeResource::collection([$this->equipmentType]) : null,
      'serial' => $this->serial,
      'note' => $this->note
    ];
  }
}
