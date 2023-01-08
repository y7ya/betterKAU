<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Courses extends Model
{

    protected $primaryKey = 'id';
    protected $fillable = ['course','term_id','number','name'];

    
    public function term(){
        $this->belongsTo(Terms::class);
    }

    public function lectures(){
        return $this->hasMany(Lectures::class,'course_id','id');
    }

}
