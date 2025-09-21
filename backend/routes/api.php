<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\SizeController;
use App\Http\Controllers\Admin\TempImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('/admin/login', 'authenticate');
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function () {
    // Categories All Route
    Route::resource('categories', CategoryController::class);
    // Brands All Route
    Route::resource('brands', BrandController::class);
    // Sizes All Route
    Route::controller(SizeController::class)->group(function () {
        Route::get('sizes', 'index');
    });
    // Products All Route
    Route::controller(ProductController::class)->group(function () {
        Route::post('save-product-image', 'saveProductImage');
        Route::get('change-product-default-image', 'updateDefaultImage');
    });
    Route::resource('products', ProductController::class);
    // Temp Image All Route
    Route::controller(TempImageController::class)->group(function () {
        Route::post('temp-images', 'store');
    });
});
