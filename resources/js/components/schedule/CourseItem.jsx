import Collapsible from "react-collapsible"; // https://github.com/glennflanagan/react-collapsible
import { Row, Card, Form, Button } from "react-bootstrap";
import CourseLecture from "./CourseLecture";
import RadioGroup from "@mui/material/RadioGroup";
import { useState } from "react";

const CourseItem = ({ course, selectedLectures, addSelectedLectures,removeSelectedLectures  }) => {
    const [checked,setChecked] = useState();
    const isLecturesOverlapping = (lecture, selectedLectures) => {
        if (!selectedLectures[0]) return false;
        for (let class_index = 0; class_index < lecture["classes"].length; class_index++) {            
            for (let i = 0; i < selectedLectures.length; i++) {
                for (let j = 0; j < selectedLectures[i]['lecture']['classes'].length; j++) {
                    if(lecture.course_id == selectedLectures[i]['lecture'].course_id) continue;
                    if(isTimeOverlapping(lecture["classes"][class_index], selectedLectures[i]['lecture']['classes'][j])) return true;
                }
            }
        }
    };

    const isTimeOverlapping = (class1, class2) => {
        if(class1.day !== class2.day) return false;
        return (class1.time_end >= class2.time_start && class1.time_start <= class2.time_end)
    };


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
                            // if (isLecturesOverlapping(lecture, selectedLectures))return;
                            return (
                                <CourseLecture
                                    key={lecture.id}
                                    checked={checked}
                                    setChecked={setChecked}
                                    lecture={lecture}
                                    course={course}
                                    addSelectedLectures={addSelectedLectures}
                                    removeSelectedLectures={removeSelectedLectures }
                                    isOverlapped={isLecturesOverlapping(lecture, selectedLectures)}
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
