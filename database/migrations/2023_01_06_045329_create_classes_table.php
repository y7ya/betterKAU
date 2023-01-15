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
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("lecture_id"); // ex: 3
            $table->foreign("lecture_id")->references('id')->on('lectures')->onDelete('cascade');
            $table->string('number',5)->nullable(); // ex: 5
            $table->string('time_start',30)->nullable(); // ex: 10:00 AM
            $table->string('time_end',30)->nullable(); // ex: 10:50 AM
            $table->string('day', 3)->nullable(); // ex: W
            $table->string('building',100)->nullable(); // ex: مبنى السنة التحضيرية 1
            $table->string('room',15)->nullable(); // ex: 114A
            $table->string('lecturer',100)->nullable(); // ex: ابراهيم خالد الحربي
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('classes');
    }
};
