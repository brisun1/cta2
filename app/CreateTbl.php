<?php

namespace App;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use App\Shop;
use App\User;

class CreateTbl extends Model
{
    public function create_menu_tbl(){
        
        $shops=Auth::user()->shops;
        //$shops = App\User::find(1)->shops;
        //$shops =App\Shop::all();
        //::find(1)->shops;
        
        
        foreach ($shops as $shop) {
            $sid=$shop->id;
            $sname=$shop->name;
            $sarea=$shop->area;
            $tbl_name='menu_'.$sname.$sarea.$sid;
            
                if (!Schema::hasTable($tbl_name)){
                    Schema::create($tbl_name, function($table)
                    {
                        $table->id();
                        $table->string('fid');
                        $table->string('fname');
                        $table->unsignedDecimal('price', 5, 2);
                        $table->string('cat',20);
                        $table->smallInteger('catNum');
                        $table->string('note',120)->nullable();
                        $table->boolean('isMain');
                        $table->timestamps();
                    });
                }
        }
    }
    public function create_orderFoodTbl($tblName){
        
       
        //$shops = App\User::find(1)->shops;
        //$shops =App\Shop::all();
        //::find(1)->shops;
        
        
        
            // $sid=$shop->id;
            // $sname=$shop->name;
            // $sarea=$shop->area;
            
            
            
                if (!Schema::hasTable($tblName)){
                    
                    Schema::create($tblName, function($table)
                    {
                        $table->id();
                        $table->string('fid');
                        $table->string('fname');
                        $table->string('main_attach')->nullable;
                        $table->unsignedSmallInteger('qty');
                        $table->unsignedDecimal('price', 5, 2);
                        // $table->string('cat',20);
                        // $table->smallInteger('catNum');
                        // $table->string('note',120)->nullable();
                        // $table->boolean('isMain');
                        $table->timestamps();
                    });
                }
        
    }
}
