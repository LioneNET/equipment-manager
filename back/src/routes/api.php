<?php

use App\Http\Controllers\EquipmentsController;
use App\Http\Controllers\EquipmentsTypeController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});*/

Route::post('login', [LoginController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
  Route::group(['prefix' => 'equipment'], function () {
    Route::post('/', [EquipmentsController::class, 'addEquipment']);
    Route::put('/{id}', [EquipmentsController::class, 'updateEquipment'])->where('id', '[0-9]+');
    Route::delete('/{id}', [EquipmentsController::class, 'deleteEquipment'])->where('id', '[0-9]+');
    Route::get('/{id}', [EquipmentsController::class, 'show'])->where('id', '[0-9]+');
    Route::get('/', [EquipmentsController::class, 'index']);
  });
  Route::group(['prefix' => 'equipment_types'], function () {
    Route::get('/', [EquipmentsTypeController::class, 'index']);
  });
  Route::post('/logout', [LoginController::class, 'logout']);
});
