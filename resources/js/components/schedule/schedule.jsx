import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import React, { Component, useEffect, useState, useRef } from "react";
import "../../../css/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
import { Row, Card, Form, Button } from "react-bootstrap";

const Schedule = (props) => {
    const scheduleRef = useRef(null);
    return (
        <div>
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
                    ref={scheduleRef}
                />
            </Card>
        </div>
    );
};

export default Schedule;
