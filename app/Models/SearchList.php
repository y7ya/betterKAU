<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SearchList extends Model
{
    use CrudTrait;

    protected $table = "search_list";
    protected $primaryKey = "id";

}
