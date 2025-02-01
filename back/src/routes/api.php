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
*/

Route::post('login', [LoginController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum', 'api']], function () {
    Route::apiResource('equipment', EquipmentsController::class);
    Route::group(['prefix' => 'equipment_types'], function () {
        Route::get('/', [EquipmentsTypeController::class, 'index']);
    });
    Route::post('/logout', [LoginController::class, 'logout']);
});
