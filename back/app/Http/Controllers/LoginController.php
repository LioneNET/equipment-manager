<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
  public function login(LoginRequest $request)
  {
    $user = User::query()->where('email', $request->input('email'))->first();

    if (!$user || !Hash::check($request->input('password'), $user->password)) {
      return response()->json([
        'error' => "Неверный маил или пароль"
      ], 401);
    }

    return response()->json([
      'token' => $user->createToken('myToker')->plainTextToken
    ]);
  }

  public function logout(Request $request)
  {
    Auth::guard('web')->logout();
    $request->user()->tokens()->delete();
    return response()->json([], 204);
  }
}
