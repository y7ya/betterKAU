<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lectures', function (Blueprint $table) {
            $table->id();
            $table->string("number",30)->nullable(); // ex: 68816
            
            $table->unsignedBigInteger("course_id"); // ex: 3
            $table->foreign("course_id")->references('id')->on('courses')->onDelete('cascade');            
            
            $table->string("name",50)->nullable(); // ex: IT1
            $table->string("type",50)->nullable(); // ex: نظري/عملي
            $table->string("days",10)->nullable(); // ex: MTU

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lectures');
    }
};
