<?php

namespace App\Http\Controllers;

use App\Http\Requests\EquipmentRequest;
use App\Http\Requests\EquipmentUpdateRequest;
use App\Http\Resources\EquipmentResource;
use App\Http\Resources\EquipmentCollection;
use App\Models\Equipment;
use App\Services\Equipment\EquipmentService;
use Illuminate\Http\Request;

class EquipmentsController extends Controller
{
  /** запрос с параметрами id, serial_number, note, equipment_type */
  public function index(Request $request)
  {
    $equipmentService = new EquipmentService();
    return EquipmentResource::collection($equipmentService->getEquipments($request));
  }

  /** запрос по id */
  public function show(Request $request)
  {
    return new EquipmentResource(Equipment::find($request->route('id')));
  }

  public function addEquipment(EquipmentRequest $request)
  {
    $equipmentService = new EquipmentService();
    return $equipmentService->createEquipments($request);
  }

  public function updateEquipment(EquipmentUpdateRequest $request)
  {
    $equipmentService = new EquipmentService();
    return $equipmentService->updateEquipments($request);
  }

  public function deleteEquipment(Request $request)
  {
    $equipmentService = new EquipmentService();
    return $equipmentService->deleteEquipment($request);
  }
}
