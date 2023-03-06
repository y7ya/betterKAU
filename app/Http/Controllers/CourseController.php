<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\Terms;
use Exception;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        if (!preg_match('/^[a-zA-Z]{1,5}-[0-9]{1,5}$/', $request->course)) return response()->json(['message' => 'صغية المادة غير صحيحة']);
        
        $course = explode('-', $request->course);
        if(!Courses::where('term_id',Terms::where('active',1)->first()->id)->where('course', $course[0])->first()) return response()->json(['message' => 'المادة ليست موجودة في سجلاتنا لإضافة المادة تواصل معنا على تويتر']); 
        return Courses::with(['term','lectures.classes'])->where('term_id',Terms::where('active',1)->first()->id)->where('course', $course[0])->where('number', $course[1])->first() ?? response()->json(['message' => 'لا توجد شعب لهذه المادة']);
    }
}
