import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Card, Form, Button } from "react-bootstrap";
import CourseItem from "./CourseItem";

const CourseList = ({ courses,addSelectedCourses }) => {
    return (
        <Card className="p-3 mt-2" dir="rtl">
            <h5 className="mb-2">الشعب الدراسية</h5>
            <hr className="p-0 m-0" />
            <div className="mt-1">
                {courses.map((course) => {
                    return <CourseItem key={course.id} course={course} addSelectedCourses={addSelectedCourses}/>;
                })}
            </div>
        </Card>
    );
};

export default CourseList;
