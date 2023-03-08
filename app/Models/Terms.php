<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Terms extends Model
{
    use CrudTrait;
    protected $primaryKey = 'id';

    protected $fillable = [
        'number',
        'name',
        'active',
    ];

    public function courses(){
        return $this->hasMany(Courses::class);
    }
}
