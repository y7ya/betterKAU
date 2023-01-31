import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import React, { Component, useEffect, useState } from "react";
import "../../css/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Card, Form, Button } from "react-bootstrap";
import Schedule from "./schedule/Schedule";
import SearchFrom from "./schedule/SearchFrom";
import LecturesList from "./schedule/LecutresList";

const Home = (props) => {
    return (
        <div className="container mt-5">
            <Row>
                <div className="col-md-9 col-xs-12 col-sm-12">
                    <Schedule />
                </div>

                <div className=" col-md-3 col-sm-12">
                    <SearchFrom/>

                    <LecturesList />
                </div>
            </Row>
        </div>
    );
};

export default Home;
