<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//Route::get('shopShow','Api\ShopController@show');
Route::ApiResource('shop','Api\ShopController');
//->middleware('auth:api')
Route::post('menu/store','Api\MenuController@store');
Route::get('menu/show','Api\MenuController@show');
Route::put('menu/update','Api\MenuController@update')->middleware('auth:api');