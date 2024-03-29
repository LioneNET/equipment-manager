# Описание

Список оборудования с возможностью добавления удаления и редактирования

Фронт написан на vue3
Бек на laravel 9

![alt text](/assets/6.png)

![alt text](/assets/1.jpg)

![alt text](/assets/2.png)

![alt text](/assets/3.png)

![alt text](/assets/4.png)

![alt text](/assets/5.png)

## Фронт vue

Форма добавления  записей,  содержит: 
1. Список «Тип  оборудования»
2. поле «Серийные  номера»  
3. Поле  «Примечание»   
4. Кнопка  «Добавить». 
   
Форма поиска,  редактирования  и удаления  записей: 
1. Поисковая  строка,  для поиска по серийному  номеру/примечанию. 
2. Поле  «Код оборудования»  (id)
3. Поле  «Тип  оборудования»
4. Поле  «Серийный  номер»
5. Поле  «Примечание»
6. Кнопки  редактировать/сохранить/удалить  в  зависимости  от  выдранного  режима (просмотр/редактирование). 

* nodejs version v16.14.0 и v18.0.0
* npm version 8.3.1
* npx version 8.3.1

Установить зависимости командой `npm install`

В папке `front/src/server` указать ссылку на бек, после чего запустить командой `npm run dev`
Так же в папке `front/src/store/equipment.module.js` можно указать `limit` для страниц. По умолчанию 10 страниц

Прот запуска 3000

## Фронт react

Аналогичная установка фронта на реакте.

Порт запуска 3006

## Бек
Легче всего запустить в докере. Для этого перейдите в папку `./back` и поднимите докер контейнер командой `docker-compose up -d`
После этого поднимется нужная обьвязка: база, nginx, php сервер и т.д

Затем зайти в базу и создать таблицу `my_base`
Перейти в папку `./back/src` и переименовать файл `.env.example` на .env
Установить зависимости командой `composer install`
Запустить миграции командой `php artisan migrate`
Сгенерировать ключ приложения командой `php artisan key:generate`
Если необходимо сгенерировать тестовые данные командой `php artisan db:seed`

## api

Доступны следующие роуты:

| url                   | method     | params                                                                 | description                                |
| --------------------- | ---------- | ---------------------------------------------------------------------- | ------------------------------------------ |
| `/api/equipment`      | **get**    | `id`, `serial`, `note`, `equipment_id`                                 | выводит пагинированный список оборудования |
| `/api/equipment`      | **post**   | `equipment` (подробнее в классе `EquipmentRequest` в папке `Requests`) | пакетное добавление оборудования           |
| `/api/equipment/{id}` | **put**    | `id`, `equipment_type_id`, `serial`, `note`                            | обновление оборудования                    |
| `/api/equipment/{id}` | **delete** | `id`,                                                                  | удаление                                   |
| `/api/equipment-type` | **get**    | `id`, `name`, `serial_mask`                                            | пагинированный список наименований         |

## postman

Для тестирования aip в проект добавлен файл `testovoe.postman_collection` в нем же описаны основные запросы на api
Провести настройку `Variables`


В php artisan сделать миграции и сиды
