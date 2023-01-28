import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import Multiselect from "multiselect-react-dropdown";
import React, { Component, useEffect, useState } from "react";
import "../../../css/app.css";
import data from "./data";
import "bootstrap/dist/css/bootstrap.min.css";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
import { Row, Card, Form } from "react-bootstrap";
import Collapsible from "react-collapsible"; // https://github.com/glennflanagan/react-collapsible

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.calendarRef = React.createRef();
        this.multiselectRef = React.createRef();

        function getCourses() {
            return data;
        }

        this.state = {
            courses: getCourses(),
            selectedCourses: [],
        };
    }

    get calendar() {
        return this.calendarRef.current.getInstance();
    }

    componentDidMount() {
        this.calendar.setDate("2023-03-07");
        this.calendar.setOptions({
            useDetailPopup: true,
        });

        fetch('http://localhost:8000/course/cpit-305', {
       }).then((response) => response.json())
         .then((data) => console.log(data))
    }

    addToSelectedCourses = (e) => {};
    removeFromSelectedCourses = (e) => {};

    render() {
        return (
            <div className="container mt-5">
                <Row>
                    <div className="col-md-9 col-xs-12 col-sm-12">
                        <Card>
                            <Calendar
                                view="week"
                                isReadOnly="true"
                                week={{
                                    dayNames: [
                                        "Saturday",
                                        "Sunday",
                                        "Modnay",
                                        "Tuesday",
                                        "Wendensday",
                                        "Thursday",
                                        "Friday",
                                    ],
                                    showNowIndicator: false,
                                    workweek: true,
                                    hourStart: 7,
                                    taskView: false,
                                    eventView: ["time"],
                                }}
                                useDetailPopup={true}
                                ref={this.calendarRef}
                                theme={{
                                    "week.daygridLeft.width": "48px",
                                    "week.timegridLeft.width": "48px",
                                }}
                            />
                        </Card>
                    </div>

                    <div className=" col-md-3 col-sm-12">
                        <Card className="p-3">
                            <h5>Courses</h5>
                            <Tags
                                className="w-100"
                                placeholder="CPIT-305"
                                onChange={this.addToSelectedCourses}
                                pattern='/^[a-zA-Z]{1,5}-[0-9]{1,5}$/'
                            />
                        </Card>

                        <Card className="p-3 mt-2" dir="rtl">
                            <h5 className="mb-2">Instructors</h5>
                            <div className="mt-1">
                            <Collapsible
                                    open="true"
                                    trigger="CPIT-305 | برمجة متقدمة"
                                >
                                    <div dir="rtl" className="">
                                        <div className="rtl">
                                            <Form.Check
                                                className="ms-2"
                                                inline
                                                name="group1"
                                                type="radio"
                                                id="val1"
                                            />
                                            <label
                                                dir="rtl"
                                                className="form-check-label fw-normal"
                                                htmlFor="val1"
                                            >
                                                5439 | مد عبدالحميد
                                            </label>
                                        </div>
                                        <div className="">
                                            <Form.Check
                                                className="ms-2"
                                                inline
                                                name="group1"
                                                type="radio"
                                                id="val2"
                                            />
                                            <label
                                                dir="rtl"
                                                className="form-check-label fw-normal"
                                                htmlFor="val2"
                                            >
                                                5439 | مد عبدالحميد
                                            </label>
                                        </div>
                                        <div className="">
                                            <Form.Check
                                                className="ms-2"
                                                inline
                                                name="group1"
                                                type="radio"
                                                id="val3"
                                            />
                                            <label
                                                dir="rtl"
                                                className="form-check-label fw-normal"
                                                htmlFor="val3"
                                            >
                                                5439 | مد عبدالحميد
                                            </label>
                                        </div>
                                    </div>
                                </Collapsible>                                <Collapsible
                                    open="true"
                                    trigger="CPIT-305 | برمجة متقدمة"
                                >
                                    <div dir="rtl" className="">
                                        <div className="rtl">
                                            <Form.Check
                                                className="ms-2"
                                                inline
                                                name="group1"
                                                type="radio"
                                                id="val1"
                                            />
                                            <label
                                                dir="rtl"
                                                className="form-check-label fw-normal"
                                                htmlFor="val1"
                                            >
                                                5439 | مد عبدالحميد
                                            </label>
                                        </div>
                                        <div className="">
                                            <Form.Check
                                                className="ms-2"
                                                inline
                                                name="group1"
                                                type="radio"
                                                id="val2"
                                            />
                                            <label
                                                dir="rtl"
                                                className="form-check-label fw-normal"
                                                htmlFor="val2"
                                            >
                                                5439 | مد عبدالحميد
                                            </label>
                                        </div>
                                        <div className="">
                                            <Form.Check
                                                className="ms-2"
                                                inline
                                                name="group1"
                                                type="radio"
                                                id="val3"
                                            />
                                            <label
                                                dir="rtl"
                                                className="form-check-label fw-normal"
                                                htmlFor="val3"
                                            >
                                                5439 | مد عبدالحميد
                                            </label>
                                        </div>
                                    </div>
                                </Collapsible>                                <Collapsible
                                    open="true"
                                    trigger="CPIT-305 | برمجة متقدمة"
                                >
                                    <div dir="rtl" className="">
                                        <div className="rtl">
                                            <Form.Check
                                                className="ms-2"
                                                inline
                                                name="group1"
                                                type="radio"
                                                id="val1"
                                            />
                                            <label
                                                dir="rtl"
                                                className="form-check-label fw-normal"
                                                htmlFor="val1"
                                            >
                                                5439 | مد عبدالحميد
                                            </label>
                                        </div>
                                        <div className="">
                                            <Form.Check
                                                className="ms-2"
                                                inline
                                                name="group1"
                                                type="radio"
                                                id="val2"
                                            />
                                            <label
                                                dir="rtl"
                                                className="form-check-label fw-normal"
                                                htmlFor="val2"
                                            >
                                                5439 | مد عبدالحميد
                                            </label>
                                        </div>
                                        <div className="">
                                            <Form.Check
                                                className="ms-2"
                                                inline
                                                name="group1"
                                                type="radio"
                                                id="val3"
                                            />
                                            <label
                                                dir="rtl"
                                                className="form-check-label fw-normal"
                                                htmlFor="val3"
                                            >
                                                5439 | مد عبدالحميد
                                            </label>
                                        </div>
                                    </div>
                                </Collapsible>                                <Collapsible
                                    open="true"
                                    trigger="CPIT-305 | برمجة متقدمة"
                                >
                                    <div dir="rtl" className="">
                                        <div className="rtl">
                                            <Form.Check
                                                className="ms-2"
                                                inline
                                                name="group1"
                                                type="radio"
                                                id="val1"
                                            />
                                            <label
                                                dir="rtl"
                                                className="form-check-label fw-normal"
                                                htmlFor="val1"
                                            >
                                                5439 | مد عبدالحميد
                                            </label>
                                        </div>
                                        <div className="">
                                            <Form.Check
                                                className="ms-2"
                                                inline
                                                name="group1"
                                                type="radio"
                                                id="val2"
                                            />
                                            <label
                                                dir="rtl"
                                                className="form-check-label fw-normal"
                                                htmlFor="val2"
                                            >
                                                5439 | مد عبدالحميد
                                            </label>
                                        </div>
                                        <div className="">
                                            <Form.Check
                                                className="ms-2"
                                                inline
                                                name="group1"
                                                type="radio"
                                                id="val3"
                                            />
                                            <label
                                                dir="rtl"
                                                className="form-check-label fw-normal"
                                                htmlFor="val3"
                                            >
                                                5439 | مد عبدالحميد
                                            </label>
                                        </div>
                                    </div>
                                </Collapsible>                                <Collapsible
                                    open="true"
                                    trigger="CPIT-305 | برمجة متقدمة"
                                >
                                    <div dir="rtl" className="">
                                        <div className="rtl">
                                            <Form.Check
                                                className="ms-2"
                                                inline
                                                name="group1"
                                                type="radio"
                                                id="val1"
                                            />
                                            <label
                                                dir="rtl"
                                                className="form-check-label fw-normal"
                                                htmlFor="val1"
                                            >
                                                5439 | مد عبدالحميد
                                            </label>
                                        </div>
                                        <div className="">
                                            <Form.Check
                                                className="ms-2"
                                                inline
                                                name="group1"
                                                type="radio"
                                                id="val2"
                                            />
                                            <label
                                                dir="rtl"
                                                className="form-check-label fw-normal"
                                                htmlFor="val2"
                                            >
                                                5439 | مد عبدالحميد
                                            </label>
                                        </div>
                                        <div className="">
                                            <Form.Check
                                                className="ms-2"
                                                inline
                                                name="group1"
                                                type="radio"
                                                id="val3"
                                            />
                                            <label
                                                dir="rtl"
                                                className="form-check-label fw-normal"
                                                htmlFor="val3"
                                            >
                                                5439 | مد عبدالحميد
                                            </label>
                                        </div>
                                    </div>
                                </Collapsible>
                            </div>
                        </Card>
                    </div>
                </Row>
            </div>
        );
    }
}

export default Schedule;
