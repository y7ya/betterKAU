import Collapsible from "react-collapsible"; // https://github.com/glennflanagan/react-collapsible
import { Row, Card, Form, Button } from "react-bootstrap";
import LectureClass from "./LectureClass";

const CourseItem = ({ course,addSelectedCourses }) => {
    return (
        <form>
            <Collapsible
                open="true"
                trigger={
                    course.course + "-" + course.number + " | " + course.name
                }
            >
                <div dir="rtl" className="">
                    {course["lectures"].map((lecture) => {
                        return (
                                <LectureClass key={lecture.id} lecture={lecture} course={course} addSelectedCourses={addSelectedCourses} />
                        );
                    })}
                </div>
            </Collapsible>
        </form>
    );
};

export default CourseItem;
