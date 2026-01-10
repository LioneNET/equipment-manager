<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Модель по работе с типами оборудований
 *
 * @property string $name
 * @property string $serial_mask
 */
class EquipmentType extends Model
{
  use HasFactory;
  use Filterable;

  protected $fillable = [
    'name',
    'serial_mask'
  ];
}
