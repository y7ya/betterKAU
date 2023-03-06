import Collapsible from "react-collapsible"; // https://github.com/glennflanagan/react-collapsible
import { Row, Card, Form, Button } from "react-bootstrap";
import { Radio } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { theme } from "./theme";
import { useState } from "react";

const CourseLecture = ({ lecture, course, addSelectedLectures,removeSelectedLectures ,checked,setChecked,isOverlapped }) => {
    const handleSelect = (e) => {
        let lectureData = {
            id: course.id,
            course: course.course,
            number: course.number,
            name: course.name,
            created_at: course.created_at,
            updated_at: course.updated_at,
            lecture,
            term: course.term,
            color: course.color,
        };
        if(checked == lecture.id){
            setChecked();
            removeSelectedLectures(lectureData.course + "-" + lectureData.number);
        }else{
            setChecked(lecture.id);
            addSelectedLectures(lectureData);
        }
    };

    return (
        <>
            <div className="rtl text-nowrap">
                <FormControlLabel
                    value={lecture.id}
                    control={
                        <Radio
                            id={lecture.id}
                            className="ms-2"
                            name="group1"
                            type="radio"
                            onClick={handleSelect}
                            checked={checked==lecture.id}
                            sx={{
                                padding: 0,
                                color: course.color,
                                "&.Mui-checked": {
                                    color: course.color,
                                },
                            }}
                            disabled={isOverlapped}
                        />
                    }
                />
                <label
                    dir="rtl"
                    className={`form-check-label fw-normal mx-2 ${isOverlapped?'text-muted':''}`}
                    htmlFor={lecture.id}
                >
                    {lecture.number + " | " + (lecture["classes"][0]?.lecturer ? lecture["classes"][0]?.lecturer: '')}
                </label>
            </div>
        </>
    );
};

export default CourseLecture;
