<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lectures extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = ['number','course_id','name','type','days'];

    public $timestamps = false;

    public function course(){
        return $this->belongsTo(Courses::class,'course_id');
    }

    public function classes(){
        return $this->hasMany(Classes::class,'lecture_id');
    }
}
