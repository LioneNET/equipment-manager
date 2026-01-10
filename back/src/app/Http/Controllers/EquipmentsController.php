<?php

namespace App\Http\Controllers;

use App\Http\Requests\EquipmentRequest;
use App\Http\Requests\EquipmentUpdateRequest;
use App\Http\Resources\EquipmentResource;
use App\Models\Equipment;
use App\Services\Equipment\EquipmentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * Контроллер по работе с оборудованием
 * добавление/удаление/обновление/создание
 */
class EquipmentsController extends Controller
{
    /**
     * Запрос с параметрами id, serial_number, note, equipment_type
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        return EquipmentResource::collection(
            Equipment::filter($request)->paginate($request->input('limit'))
        );
    }

    /**
     * Получение конкретного оборудования
     *
     * @param Equipment $equipment
     * @return EquipmentResource
     */
    public function show(Equipment $equipment): EquipmentResource
    {
        return EquipmentResource::make($equipment);
    }

    /**
     * Добавить оборудование
     *
     * @param EquipmentRequest $request
     * @param EquipmentService $equipmentService
     * @return JsonResponse
     */
    public function store(EquipmentRequest $request, EquipmentService $equipmentService): JsonResponse
    {
        return response()->json(
            $equipmentService->createEquipments($request->validated()), 200, [], JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * Обновить оборудование
     *
     * @param EquipmentUpdateRequest $request
     * @param Equipment $equipment
     * @return JsonResponse
     */
    public function update(EquipmentUpdateRequest $request, Equipment $equipment): JsonResponse
    {
        $equipment->update($request->validated());
        return response()->json(['success' => 'Успешно сохранено!'], 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Удалить оборудование
     * @param Equipment $equipment
     * @return JsonResponse
     */
    public function destroy(Equipment $equipment): JsonResponse
    {
        $equipment->delete();
        return response()->json(['success' => 'Успешно удалено!'], 200, [], JSON_UNESCAPED_UNICODE);
    }
}
