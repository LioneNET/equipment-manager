<?php

namespace app\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class EquipmentTypeFilter
{
    public function id(Builder $builder, $value): void
    {
        $builder->where('id', '=', $value);
    }

    public function name(Builder $builder, $value): void
    {
        $builder->where('name', 'LIKE', '%' . $value . '%');
    }

    public function serial_mask(Builder $builder, $value): void
    {
        $builder->where('serial_mask', 'LIKE', '%' . $value . '%');
    }
}
