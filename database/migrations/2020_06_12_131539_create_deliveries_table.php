<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeliveriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id();
            $table->string('shop_id');
            $table->double('dist1',2,1);
            $table->double('dist15',2,1);
            $table->double('dist2',2,1);
            $table->double('dist25',2,1);
            $table->double('dist3',2,1);
            $table->double('dist4',2,1);
            $table->double('servLimit',3,1);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deliveries');
    }
}
