<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\SizeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login', [AuthController::class, 'authenticate']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function () {
    // Categories All Route
    Route::resource('categories', CategoryController::class);
    // Brands All Route
    Route::resource('brands', BrandController::class);

    // Sizes All Route
    Route::controller(SizeController::class)->group(function(){
        Route::get('sizes', 'index');
    });
});
