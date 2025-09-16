<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('role')->insert(['nama_role' => 'admin']);
        DB::table('role')->insert(['nama_role' => 'nakes']);
        DB::table('role')->insert(['nama_role' => 'balita']);
    }
}
