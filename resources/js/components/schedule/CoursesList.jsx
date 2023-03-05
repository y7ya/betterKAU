import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Card, Form, Button } from "react-bootstrap";
import CourseItem from "./CourseItem";

const CourseList = ({ courses, selectedLectures, addSelectedLectures,removeSelectedLectures  }) => {
    return (
        <Card className="p-2 mt-2" dir="rtl">
            <h5 className="mb-2">الشعب الدراسية</h5>
            <hr className="p-0 m-0" />
            <div className="mt-1">
                {!courses.length && <div className="w-100 text-center">لم يتم اختيار المواد</div>}
                {courses.map((course) => {
                    return (
                        <CourseItem key={course.id} course={course}  addSelectedLectures={addSelectedLectures} selectedLectures={selectedLectures} removeSelectedLectures={removeSelectedLectures}/>
                    );
                })}
            </div>
        </Card>
    );
};

export default CourseList;
