<?php

namespace Database\Seeders;

use App\Models\EquipmentType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    \App\Models\User::factory(1)->create();
    DB::table('equipment_types')->insert([
      [
        'name' => 'TP-Link  TL-WR74',
        'serial_mask' => 'XXAAAAAXAA'
      ],
      [
        'name' => 'D-Link DIR-300',
        'serial_mask' => 'NXXAAXZXaa'
      ],
      [
        'name' => 'D-Link DIR-300  S',
        'serial_mask' => 'NXXAAXZXXX'
      ],
    ]);
  }
}
