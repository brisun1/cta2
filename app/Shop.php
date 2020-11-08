<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\user;
class Shop extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }
    // public function carOwner()
    // {
    //     return $this->hasOneThrough(
    //         'App\Owner',
    //         'App\Menu',
    //         'shop_id', // Foreign key on menus table...
    //         'menu_id', // Foreign key on owners table...
    //         'id', // Local key on mechanics table...
    //         'id' // Local key on menus table...
    //     );
    // }
    public function orders()
    {
        return $this->hasMany('App\Order')->orderBy('created_at','DESC');
    }
    public function delivery()
    {
        return $this->hasOne('App\Delivery');
    }
}
