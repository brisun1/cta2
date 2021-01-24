<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');

            $table->string('name',30);
            $table->string('shop_id');
            $table->string('addr',100);
           
            $table->string('area',50);
            $table->string('phone',30);
            $table->string('owner_name',30);
            $table->string('owner_mobl',30)->nullable();
            $table->string('cter_mobl',30);
            $table->string('order_mobl',30)->nullable();
            $table->string('img');
            $table->string('img1')->nullable();
            $table->text('prom_txt1')->nullable();
            $table->string('img2')->nullable();
            $table->text('prom_txt2')->nullable();
            $table->string('img3')->nullable();
            $table->text('prom_txt3')->nullable();
            $table->integer('offer',2)->nullable();
            $table->time('week_open',0);
            $table->time('week_close',0);
            $table->time('fri_open',0);
            $table->time('fri_close',0);
            $table->time('sat_open',0);
            $table->time('sat_close',0);
            $table->time('sun_open',0);
            $table->time('sun_close',0);
            $table->boolean('is_completed');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shops');
    }
}
