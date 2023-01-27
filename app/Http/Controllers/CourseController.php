<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use Exception;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index($course)
    {
        if (!preg_match('/^[a-zA-Z]{1,5}-[0-9]{1,5}$/', $course)) return response()->json(['message' => 'Wrong course format']);

        $course = explode('-', $course);
        return Courses::with('lectures.classes')->where('course', $course[0])->where('number', $course[1])->first() ?? response()->json(['message' => 'Course not found']);
    }
}
