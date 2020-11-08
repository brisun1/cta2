<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBanksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('banks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('ac_name',30);
            $table->string('owner_name',30);
            $table->string('contactPh',30);
            $table->string('ownerPh',30);
            $table->string('sort_code',8);
            $table->string('account',10);
            $table->string('iban',30);
            $table->boolean('approved');
            $table->string('license');
            $table->string('statemt');
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
        Schema::dropIfExists('banks');
    }
}
