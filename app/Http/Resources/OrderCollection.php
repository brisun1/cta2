<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;
//use App\Shop;
class OrderCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
//     public $shop_id;
//     public function __construct($shop_id)
//     {
        
    

//     if (Auth::check())
//         {
//             $shops=User::find(Auth::id())->shops;
//         }
          
       
       
//         if(isset($shops)){
//         foreach($shops as $shop){
//             $shop_id=$shop->id;
//         }
//         $this->shop_id=$shop_id;
//     }  
// }  
    public function toArray($request)
    {
        
        
           
        return [
            'data' => $this->collection,
            'auth' => [
                'user_id' => Auth::id(),
            ],
        ];
    }
}
