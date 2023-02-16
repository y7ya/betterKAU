import Collapsible from "react-collapsible"; // https://github.com/glennflanagan/react-collapsible
import { Row, Card, Form, Button } from "react-bootstrap";

const LectureClass = ({ lecture,course }) => {
    const handleSelect = (e) => {
        
        // let filteredCourse course; 
        // filteredCourse = filteredCourse['lectures'].filter((classs)=>classs.id==lecture.id); 
        // console.log(filteredCourse); 

        // course['lectures'] = course['lectures'].filter((classs)=>classs.id==lecture.id);
        // console.log(course);
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
