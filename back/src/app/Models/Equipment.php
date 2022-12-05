<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * модель по работе с оборудованием
 */
class Equipment extends Model
{
  use HasFactory;

  protected $table = 'equipments';

  protected $fillable = [
    'equipment_id',
    'serial',
    'note'
  ];

  /**
   * Зависимость пренадлежность
   * Текущее оборудование принадлежит к определенному типу
   */
  public function equipmentType()
  {
    return $this->belongsTo(EquipmentType::class, 'equipment_id', 'id');
  }
}
