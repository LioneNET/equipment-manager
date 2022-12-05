<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Ресурсы пользователя
 */
class LoginResource extends JsonResource
{

  private $status = 200;
  public static $wrap = null;

  /**
   * Возвращает токен при авторизации либо ошибку авторизации
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    if ($this->resource == null) {
      $this->status = 401;
      return ['error' => "Неверный маил или пароль"];
    }
    return [
      'token' => $this->createToken('myToker')->plainTextToken
    ];
  }

  /**
   * Устанавливаем стаус запроса
   * 
   * @return void
   */
  public function withResponse($request, $response)
  {
    $response->setStatusCode($this->status);
  }
}
