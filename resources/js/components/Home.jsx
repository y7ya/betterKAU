import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import React, { Component, useEffect, useState } from "react";
import "../../css/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Card, Form, Button } from "react-bootstrap";
import Schedule from "./schedule/Schedule";
import SearchForm from "./schedule/SearchForm";
import CoursesList from "./schedule/CoursesList";
import Navbar from "./schedule/Navbar";
import { remove } from "lodash";


const Home = () => {
    const [courses,setCourses] = useState([]);
    const [selectedCourses,setSelectedCourses] = useState([]);

    const addCourse = (course) =>{
        setCourses(courses=>[course,...courses]);
    }
    
    const removeCourse = (removeCourse) =>{
        setCourses(courses=>[...courses].filter(course=>(course.course + '-' + course.number) != removeCourse.toUpperCase()));
    }
    
    const addSelectedCourses = (selectedCourse) => {
        setSelectedCourses(selectedCourses=>[selectedCourse,...selectedCourses.filter(course=>course.id != selectedCourse.id)]);
    }

    // const removeSelectedCourses = () => { 
    //     selectedCourses(courses=>[...courses].filter(course=>(course.course + '-' + course.number) != removeCourse.toUpperCase()));
    // }

    useEffect(()=>{
    },[courses,selectedCourses])


    return (
        <div className="">
            {/* <Navbar /> */}
            <div className="container mt-5 p-3 rounded sched-shadwo" style={{ backgroundColor: "white" }}>
                <Row>
                    <div className="col-md-9 col-xs-12 col-sm-12">
                        <Schedule />
                    </div>

                    <div className=" col-md-3 col-sm-12">
                        <SearchForm addCourse={addCourse} removeCourse={removeCourse} />

                        <CoursesList courses={courses} addSelectedCourses={addSelectedCourses} />
                    </div>
                </Row>
            </div>
        </div>
    );
};

export default Home;
