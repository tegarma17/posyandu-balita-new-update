<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert(
            [
                [
                    'role_id' => 1,
                    'name' => 'Admin',
                    'email' => 'adminposyandu@admin.com',
                    'password' => bcrypt('admin'),
                    'remember_token' => \Illuminate\Support\Str::random(10),
                ]
            ]
        );
    }
}
