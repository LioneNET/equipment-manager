<?php

namespace App\Http\Controllers;

use App\Http\Resources\EquipmentTypeResource;
use App\Services\Equipment\EquipmentTypeService;
use Illuminate\Http\Request;

/**
 * Контроллер по работе с типами оборудования
 * поиск по ключам 
 */
class EquipmentsTypeController extends Controller
{
    public function index(Request $request, EquipmentTypeService $equipmentTypeService ) {
      return EquipmentTypeResource::collection($equipmentTypeService->getEquipments($request));
    }
}
