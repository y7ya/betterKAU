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
        Schema::create('search_list', function (Blueprint $table) {
            $table->id();
            $table->string("course",20)->unique(); // course name ex: CPIT
            $table->boolean("allow")->default(1); // if 0 skip from updating data
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('search_list');
    }
};
