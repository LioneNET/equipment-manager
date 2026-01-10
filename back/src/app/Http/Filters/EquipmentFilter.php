<?php

namespace app\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class EquipmentFilter
{
    public function id(Builder $builder, $value): void
    {
        $builder->where('id', '=', $value);
    }
    public function equipment_id(Builder $builder, $value): void
    {
        $builder->where('equipment_id', '=', $value);
    }

    public function serial(Builder $builder, $value): void
    {
        $builder->where('serial', 'LIKE', '%' . $value . '%');
    }

    public function note(Builder $builder, $value): void
    {
        $builder->where('note', 'LIKE', '%' . $value . '%');
    }
}
