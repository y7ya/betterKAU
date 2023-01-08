<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Terms extends Model
{
    protected $primaryKey = 'id';

    public function courses(){
        return $this->hasMany(Courses::class);
    }
}
