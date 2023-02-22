import Collapsible from "react-collapsible"; // https://github.com/glennflanagan/react-collapsible
import { Row, Card, Form, Button } from "react-bootstrap";
import { Radio } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {theme} from './theme'


const LectureClass = ({ lecture, course, addSelectedCourses }) => {
    const handleSelect = (e) => {
        // !TODO: fix this shitty code !!!!
        let lectureData = {
            id: course.id,
            course: course.course,
            number: course.number,
            name: course.name,
            created_at: course.created_at,
            updated_at: course.updated_at,
            lecture,
            term_id: course.term_id,
            color:course.color
        };
        addSelectedCourses(lectureData);
    };
    return (
        <>
            <div className="rtl">
                <FormControlLabel
                    value={lecture.id}
                    control={
                        <Radio
                        id={lecture.id}
                            className="ms-2"
                            name="group1"
                            type="radio"
                            onChange={handleSelect}
                            sx={{
                                padding:0,
                                color: course.color,
                                "&.Mui-checked": {
                                    color: course.color,
                                },
                            }}
                        />
                    }
                />
                <label
                    dir="rtl"
                    className="form-check-label fw-normal mx-2"
                    htmlFor={lecture.id}
                >
                    {lecture.number + " | " + lecture["classes"][0].lecturer}
                </label>
            </div>
        </>
    );
};

export default LectureClass;
