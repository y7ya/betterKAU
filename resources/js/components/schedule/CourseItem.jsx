import Collapsible from "react-collapsible"; // https://github.com/glennflanagan/react-collapsible
import { Row, Card, Form, Button } from "react-bootstrap";
import LectureClass from "./LectureClass";
import RadioGroup from '@mui/material/RadioGroup';

const CourseItem = ({ course, addSelectedLectures }) => {

    return (
        <form>
            <Collapsible
                open="true"
                trigger={
                    course.course + "-" + course.number + " | " + course.name
                }
            >
                <div dir="rtl" className="">
                    <RadioGroup>
                        {course["lectures"].map((lecture) => {
                            return (
                                <LectureClass
                                    key={lecture.id}
                                    lecture={lecture}
                                    course={course}
                                    addSelectedLectures={addSelectedLectures}
                                />
                            );
                        })}
                    </RadioGroup>
                </div>
            </Collapsible>
        </form>
    );
};

export default CourseItem;
