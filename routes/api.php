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
Route::put('shop/minorUpdate','Api\ShopController@minorUpdate')->middleware('auth:api');
Route::post('menu/store/{str_tbl}','Api\MenuController@store')->middleware('auth:api');
Route::get('menu/show/{str_tbl}','Api\MenuController@show');
Route::post('menu/update/{str_tbl}','Api\MenuController@update')->middleware('auth:api');
//order route
Route::get('order/show','Api\OrderController@show')->middleware('auth:api');
Route::post('order/store/{str_tbl}','Api\OrderController@store');
Route::post('order/storeFood/{str_tbl}','Api\OrderController@storeFood');
Route::put('order/update/{str_tbl}','Api\OrderController@update');
Route::put('order/clientUpdate/{tblName}','Api\OrderController@clientUpdate');
Route::put('order/clientUpdate2/{tblName}','Api\OrderController@clientUpdate2');
Route::get('order/custShow/{str_tbl}','Api\OrderController@custShow');
Route::post('order/matchPwd/{str_tbl}','Api\OrderController@matchPwd');
Route::post('order/test/{str_tbl}','Api\OrderController@test');
Route::post('delivery/store/{str_tbl}','Api\DeliveryController@store')->middleware('auth:api');
Route::get('delivery/show','Api\DeliveryController@show')->middleware('auth:api');
Route::get('delivery/custShow/{shopId}','Api\DeliveryController@custShow');
Route::put('delivery/update','Api\DeliveryController@update')->middleware('auth:api');
//stripe
Route::get('stripe/intent/{orderTblString}','Api\StripeController@create_pay_intent');
Route::get('sms/send','Api\SmsController@send');
Route::get('shop/user','Api\ShopController@getUser')->middleware('auth:api');
Route::post('bank/store','Api\BankController@store')->middleware('auth:api');
Route::get('bank/show','Api\BankController@show')->middleware('auth:api');
Route::put('bank/update','Api\BankController@update')->middleware('auth:api');