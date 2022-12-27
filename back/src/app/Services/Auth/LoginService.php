<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

/**
 * Вся логика с авторизацией
 */
class LoginService
{
  /**
   * Автроризация пользователя
   *
   * возвращает пользователя либо null если пользователь не найден
   *
   * @return null | \App\Models\User
   */
  public function autorization(Request $request)
  {
    $user = User::query()->where('email', $request->input('email'))->first();
    if (!$user || !Hash::check($request->input('password'), $user->password)) {
        return null;
    }
    return $user;
  }

  /**
   * Выходим и чистим все токены
   *
   * @return array
   */
  public function logout(Request $request)
  {
    Auth::guard('web')->logout();
    $request->user()->tokens()->delete();
    return response()->json([], 204);
  }
}
