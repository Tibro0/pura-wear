<?php

namespace Database\Seeders;

use App\Models\ProductImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductImage::insert([
            [
                'product_id' => 1,
                'image' => '1-product.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 2,
                'image' => '2-product.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 3,
                'image' => '3-product.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 4,
                'image' => '4-product.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 5,
                'image' => '5-product.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 6,
                'image' => '6-product.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 7,
                'image' => '7-product.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
