<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * модель по работе с оборудованием
 */
class Equipment extends Model
{
  use HasFactory;
  use Filterable;

  protected $table = 'equipments';

  protected $fillable = [
    'equipment_id',
    'serial',
    'note'
  ];

  /**
   * Текущее оборудование принадлежит к определенному типу
   */
  public function equipmentType(): BelongsTo
  {
    return $this->belongsTo(EquipmentType::class, 'equipment_id', 'id');
  }
}
