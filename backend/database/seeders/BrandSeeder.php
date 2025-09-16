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
                'name'=> 'Puma',
                'status'=> 1,
                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'name'=> 'Adidas',
                'status'=> 1,
                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'name'=> 'Flying Machine',
                'status'=> 1,
                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'name'=> 'Levis',
                'status'=> 1,
                'created_at'=> now(),
                'updated_at'=> now(),
            ],
            [
                'name'=> 'Killer',
                'status'=> 1,
                'created_at'=> now(),
                'updated_at'=> now(),
            ],
        ]);
    }
}
