<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\LoginResource;
use App\Services\Auth\LoginService;
use Illuminate\Http\Request;

/**
 * Контроллер по работе с авторизацией
 */
class LoginController extends Controller
{
  /**
   * Запрос авторизации
   */
  public function login(LoginRequest $request)
  {
    $loginService = new LoginService();
    return new LoginResource($loginService->autorization($request));
  }

  /**
   * выход
   */
  public function logout(Request $request)
  {
    $loginService = new LoginService();
    return $loginService->logout($request);
  }
}
