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
//Route::ApiResource('shop','Api\ShopController');
//->middleware('auth:api')
Route::get('shop/index','Api\ShopController@index');
Route::get('shop/show','Api\ShopController@show')->middleware('auth:api');
Route::post('shop/store','Api\ShopController@store')->middleware('auth:api');
Route::put('shop/update','Api\ShopController@update')->middleware('auth:api');
Route::post('menu/store/{str_tbl}','Api\MenuController@store')->middleware('auth:api');
Route::get('menu/show/{str_tbl}','Api\MenuController@show');
Route::post('menu/update/{str_tbl}','Api\MenuController@update')->middleware('auth:api');
//order route
Route::get('order/show','Api\OrderController@show');
Route::post('order/store/{str_tbl}','Api\OrderController@store');
Route::post('order/storeFood/{str_tbl}','Api\OrderController@storeFood');
Route::put('order/update/{str_tbl}','Api\OrderController@update');
Route::get('order/custShow/{str_tbl}','Api\OrderController@custShow');
Route::post('order/matchPwd/{str_tbl}','Api\OrderController@matchPwd');
Route::post('delivery/store/{str_tbl}','Api\DeliveryController@store')->middleware('auth:api');
Route::get('delivery/show/{shop_id}','Api\DeliveryController@show');
//stripe
Route::get('stripe/intent/{orderTblString}','Api\StripeController@create_pay_intent');
Route::get('sms/send','Api\SmsController@send');