import Collapsible from "react-collapsible"; // https://github.com/glennflanagan/react-collapsible
import { Row, Card, Form, Button } from "react-bootstrap";

const LectureClass = ({ lecture,course,addSelectedCourses }) => {
    
    const handleSelect = (e) => {
        // !TODO: fix this shitty code !!!!
        let lectureData = {
            id: course.id,
            course: course.course,
            number:course.number,
            name: course.name,
            created_at: course.created_at,
            updated_at: course.updated_at,
            lecture,
            term_id: course.term_id,
        }
        addSelectedCourses(lectureData);
    }

    return (
        <>
            <div className="rtl">
                <Form.Check
                    className="ms-2"
                    inline
                    name="group1"
                    type="radio"
                    id={lecture.id}
                    onChange={handleSelect}
                />
                <label
                    dir="rtl"
                    className="form-check-label fw-normal"
                    htmlFor={lecture.id}
                >
                    {lecture.number + " | " + lecture["classes"][0].lecturer}
                </label>
            </div>
        </>
    );
};

export default LectureClass;
