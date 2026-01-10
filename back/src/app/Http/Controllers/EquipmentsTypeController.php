<?php

namespace App\Http\Controllers;

use App\Http\Resources\EquipmentTypeResource;
use App\Models\EquipmentType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * Контроллер по работе с типами оборудования
 */
class EquipmentsTypeController extends Controller
{
    /**
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function index(Request $request): AnonymousResourceCollection
    {
      return EquipmentTypeResource::collection(
          EquipmentType::filter($request)->paginate($request->input('limit'))
      );
    }
}
