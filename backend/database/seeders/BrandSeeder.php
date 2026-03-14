<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Brand::insert([
            [
                'name'=> 'Aarong',
                'status'=> 1,
                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'name'=> 'Ecstasy',
                'status'=> 1,
                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'name'=> 'Yellow',
                'status'=> 1,
                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'name'=> 'Cats Eye',
                'status'=> 1,
                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'name'=> 'Richman',
                'status'=> 1,
                'created_at'=> now(),
                'updated_at'=> now(),
            ],
        ]);
    }
}
