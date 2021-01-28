<?php

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Order;
use App\Shop;
/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Broadcast::channel('App.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });
$user=new User;


Broadcast::channel('order.{id}', function (User $user, int $id) {
    // $shops=$user->shops;
    // foreach($shops as $shop){
    // if($shop->id)$shop_id=$shop->id;
    // }
    //return $shop_id ===$order->$shop_id;
    // logger('Basked ID:hjhhhhhhhhh ');
    return (int) $user->id === (int) $id;
});
//$order_id=Order::where('id',$session('order_id'));
// Route::post('/broadcasting/auth', function(Illuminate\Http\Request $req) {
//     if($req->channel_name == 'presence'+$session('order_id')){return 'global';}
//     return abort(403);
//  });