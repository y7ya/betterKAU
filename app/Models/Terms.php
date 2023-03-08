<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Terms extends Model
{
    use CrudTrait;
    protected $primaryKey = 'id';

    public function courses(){
        return $this->hasMany(Courses::class);
    }
}
