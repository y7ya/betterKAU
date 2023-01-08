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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
                        
            $table->unsignedBigInteger("term_id"); // ex: 3
            $table->foreign("term_id")->references('id')->on('terms')->onDelete('cascade');

            $table->string("course",20); // ex: CPIT
            $table->string("number",20); // ex: 110
            $table->string("name",50); // ex: البرمجة وحل المشكلات
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
        Schema::dropIfExists('courses');
    }
};
