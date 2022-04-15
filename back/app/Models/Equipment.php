<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
  use HasFactory;

  protected $table = 'equipments';

  protected $fillable = [
    'equipment_id',
    'serial',
    'note'
  ];

  public function equipmentType()
  {
    return $this->belongsTo(EquipmentType::class, 'equipment_id', 'id');
  }
}
