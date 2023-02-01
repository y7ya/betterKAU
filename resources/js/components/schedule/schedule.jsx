import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import React, { Component, useEffect, useState, useRef } from "react";
import "../../../css/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
import { Row, Card, Form, Button } from "react-bootstrap";
import Collapsible from "react-collapsible"; // https://github.com/glennflanagan/react-collapsible

const Schedule = (props) => {
    const sch = useRef(null);

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
                    ref={sch}
                />
            </Card>
        </div>
    );
};
// class Schedule extends Component {
//     constructor(props) {
//         super(props);
//         this.calendarRef = React.createRef();

//         this.state = {
//             selectedCourses: [],
//         };
//     }

//     get calendar() {
//         return this.calendarRef.current.getInstance();
//     }

//     componentDidMount() {
//         this.calendar.setDate("2023-03-07");
//         this.calendar.setOptions({
//             useDetailPopup: true,
//         });

//     }

//     addToSelectedCourses = (e) => {};
//     removeFromSelectedCourses = (e) => {};

//     render() {
//
//     }
// }

export default Schedule;
