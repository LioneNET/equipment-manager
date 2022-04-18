<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * ресурсы оборудования
 */
class EquipmentResource extends JsonResource
{
  public static $wrap = 'data';
  /**
   * Возвращает набор полей оборудования, либо пустой массив
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function toArray($request)
  {
    if ($this->resource == null) {
      return [];
    } else if (is_array($this->resource)) {
      //чтобы не ранять фронт
      self::$wrap = '';
      return $this->resource;
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
