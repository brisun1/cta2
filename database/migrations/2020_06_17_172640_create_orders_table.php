<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
           
            $table->string('shop_id');
            $table->unsignedDecimal('paidAmt', 8, 2)->nullable();
            $table->unsignedDecimal('amtToPay', 8, 2)->nullable();
            $table->string('cname',30)->nullable();
            $table->string('deliAddr',100)->nullable();
       
            $table->string('contactPhone',30);
     
            $table->string('order_mobl',30)->nullable();

            $table->string('email')->nullable();
            $table->boolean('cardPay');
            $table->text('order_msg')->nullable();
            $table->unsignedDecimal('deliPrice', 4, 2)->nullable();
            $table->boolean('isDeli');
            //$table->string('orderRef');
            $table->string('orderFoodTbl');
            $table->boolean('isComplete')->nullable();
            $table->boolean('clientRes')->nullable();
            $table->string('order_pwd')->nullable();
            //$table->dateTime('created_at', 0);
            $table->dateTime('pwd_created')->nullable();
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
        Schema::dropIfExists('orders');
    }
}
