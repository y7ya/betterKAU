import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import React, { Component, useEffect, useState } from "react";
import "../../css/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Card, Form, Button } from "react-bootstrap";
import Schedule from "./schedule/Schedule";
import SearchFrom from "./schedule/SearchFrom";
import LecturesList from "./schedule/LecutresList";
import Navbar from "./schedule/Navbar";


const Home = (props) => {
    return (
        <div className="">
            <Navbar />
            <div className="container my-5 p-5 rounded sched-shadwo" style={{ backgroundColor: "white" }}>
                <Row>
                    <div className="col-md-9 col-xs-12 col-sm-12">
                        <Schedule />
                    </div>

                    <div className=" col-md-3 col-sm-12">
                        <SearchFrom />

                        <LecturesList />
                    </div>
                </Row>
            </div>
        </div>
    );
};

export default Home;
