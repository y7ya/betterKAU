<?php

use App\Http\Controllers\CourseController;
use App\Models\Courses;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // return response()->json(Courses::with('lectures.classes')->first());
    return view('welcome');
});

// TODO:: GET to POST
Route::get('/course/{course}',[CourseController::class,'index']);