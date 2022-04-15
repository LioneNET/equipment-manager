<?php

namespace App\Http\Resources;

use App\Services\Equipment\EquipmentService;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipmentTypeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
		  "id" => $this->id,
          "name" => $this->name,
          "serial_mask" => $this->serial_mask,
          "regexp" => EquipmentService::createRegExp($this->serial_mask)
        ];
    }
}
