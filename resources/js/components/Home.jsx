import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import React, { Component, useEffect, useState } from "react";
import "../../css/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Card, Form, Button } from "react-bootstrap";
import Schedule from "./schedule/schedule";
import SearchForm from "./schedule/SearchForm";
import CoursesList from "./schedule/CoursesList";
import Navbar from "./schedule/Navbar";
import { theme } from "./schedule/theme";

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const colors = [
        "gray",
        "teal",
        "red",
        "brown",
        "purple",
        "green",
        "yellowgreen",
    ];

    let currentColors = 0;
    const getColor = () => {
        currentColors++;
        return colors[Math.floor(currentColors%colors.length)];
    };
    
    const addCourse = (course) => {
        course.color = getColor();
        setCourses((courses) => [course, ...courses]);
    };

    const removeCourse = (removeCourse) => {
        setCourses((courses) =>
            [...courses].filter(
                (course) =>
                    course.course + "-" + course.number !=
                    removeCourse.toUpperCase()
            )
        );
        removeSelectedCourses(removeCourse);
    };

    const addSelectedCourses = (selectedCourse) => {
        setSelectedCourses((selectedCourses) => [
            selectedCourse,
            ...selectedCourses.filter(
                (course) => course.id != selectedCourse.id
            ),
        ]);
    };

    const removeSelectedCourses = (removeSelectedCourse) => {
        setSelectedCourses((selectedCourses) =>
            [...selectedCourses].filter(
                (selectedCourse) =>
                    selectedCourse.course + "-" + selectedCourse.number !=
                    removeSelectedCourse.toUpperCase()
            )
        );
    };

    useEffect(() => {
    }, [courses, selectedCourses]);

    return (
        <div className="">
            {/* <Navbar /> */}
            <div
                className="container mt-5 p-3 rounded sched-shadwo"
                style={{ backgroundColor: "white" }}
            >
                <Row>
                    <div className="col-md-9 col-xs-12 col-sm-12">
                        <Schedule selectedCourses={selectedCourses} />
                    </div>

                    <div className=" col-md-3 col-sm-12">
                        <SearchForm
                            addCourse={addCourse}
                            removeCourse={removeCourse}
                        />

                        <CoursesList
                            courses={courses}
                            addSelectedCourses={addSelectedCourses}
                        />
                    </div>
                </Row>
            </div>
        </div>
    );
};

export default Home;
