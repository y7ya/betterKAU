<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{

    protected $primaryKey = 'id';
    protected $fillable = ['lecture_id','number','time_start','time_end','day','building','room','lecturer'];
    public $timestamps = false;

    public $casts = [
        'time_start'=>'datetime:H:i:s',
        'time_end'=>'datetime:H:i:s',
    ];

    public function lecture(){
        return $this->belongsTo(Lectures::class,'lecture_id');
    }
}
