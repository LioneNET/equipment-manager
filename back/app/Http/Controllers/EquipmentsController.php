<?php

namespace App\Http\Controllers;

use App\Http\Requests\EquipmentRequest;
use App\Http\Requests\EquipmentUpdateRequest;
use App\Http\Resources\EquipmentResource;
use App\Models\Equipment;
use App\Services\Equipment\EquipmentService;
use Illuminate\Http\Request;
/**
 * Контроллер по работе с оборудованием
 * добавление/удаление/обновление/создание
 */
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

  /**доавлить оборудование */
  public function addEquipment(EquipmentRequest $request)
  {
    $equipmentService = new EquipmentService();
    return new EquipmentResource($equipmentService->createEquipments($request));
  }

  /**обнвить оборудование */
  public function updateEquipment(EquipmentUpdateRequest $request)
  {
    $equipmentService = new EquipmentService();
    return new EquipmentResource($equipmentService->updateEquipments($request));
  }

  /**удалить оборудование */
  public function deleteEquipment(Request $request)
  {
    $equipmentService = new EquipmentService();
    return new EquipmentResource($equipmentService->deleteEquipment($request));
  }
}
