<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
//Route::view('/{path?}','index');
Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::get('/dashBoard', 'DashBoardController@index')->name('dashBoard');
Route::get('/help', 'HelpController@contact')->name('help');
Route::post('/email', 'HelpController@email')->name('email');
Route::get('/t', function () {
    event(new \App\Events\SendMessage());
    dd('Event Run Successfully.');
});
Route::get('/tt', function () {
    event(new \App\Events\ClientRes());
    dd('Event Run Successfully.');
});
Route::get('/w', function () {
    return view('welcome');
});
Route::get('/{path?}', [
    'uses' => 'ReactController@show',
    'as' => 'react',
    'where' => ['path' => '.*']
]);
Route::get('/', function () {
    return view('index');
});


Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');

Route::get('/map', function () {
    return view('mapTest');
});
Route::get('/help', function () {
    return view('help');
});
// Route::get('/help', 'HelpController@contact')->name('help');
