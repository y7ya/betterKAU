import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import Multiselect from "multiselect-react-dropdown";
import React, { Component, useEffect, useState } from "react";
import "../../../css/app.css";
import data from './data';
import 'bootstrap/dist/css/bootstrap.min.css';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.calendarRef = React.createRef();
        this.multiselectRef = React.createRef();




        function getCourses() {
            let arr = [];
            data.forEach(element => {
                arr.push(element.course + element.number)
            });
            return arr
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
    }

    handleCheckbox = (event) => {

        //console.log(event.target.value);


        data.forEach(element => {
            element.lectures.forEach(element2 => {
                if (element2.id === Number(event.target.value)) {
                    let evt = this.calendar.getEvent(
                        element2.id,
                        "cal1"
                    );
                    if (evt === null) {
                        let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
                        element2.classes.forEach(cls => {
                            let day;
                            switch (cls.day) {
                                case "U":
                                    day = 6;
                                    break;
                                case "M":
                                    day = 7;
                                    break;
                                case "T":
                                    day = 8;
                                    break;
                                case "W":
                                    day = 9;
                                    break;
                                case "R":
                                    day = 10;
                                    break;
                                default:
                                    break;
                            }

                            this.calendar.createEvents([
                                {
                                    id: element2.id,
                                    calendarId: "cal1",
                                    title: element.course_name,
                                    start: `2023-03-0${day}T16:00:00`,
                                    location: "Buliding 31",
                                    state: "Available",
                                    end: `2023-03-0${day}T17:00:00`,
                                    backgroundColor: color,
                                    color: "#fff",
                                    isReadOnly: true,
                                    attendees: [cls.lecturer],
                                    useFormPopup: true,
                                },
                            ]);
                        })
                    } else {
                        element2.classes.forEach(cls => {
                            let evt = this.calendar.getEvent(
                                cls.lecture_id,
                                "cal1"
                            );
                            this.calendar.deleteEvent(evt.id, "cal1");
                        })
                    }
                }
            });
        });

    };



    addToSelectedCourses = (e) => {
        let newSC = [];
        e.forEach(courseName => {
            const findCourseName = data.find(element => (element.course + element.number) === courseName);
            if (findCourseName !== undefined) {
                newSC = [...newSC, findCourseName]
                console.log(newSC);
            }
        })
        this.setState({ ...this.state, selectedCourses: newSC, })

    }
    removeFromSelectedCourses = (e) => {
        let newSC = [];
        e.forEach(courseName => {
            const findCourseName = data.find(element => (element.course + element.number) === courseName);
            if (findCourseName !== undefined) {
                newSC = [...newSC, findCourseName]
                console.log(newSC);
            }
        })
        this.setState({ ...this.state, selectedCourses: newSC, })

    }




    render() {
        return (
            <div className="App container">
                <div className="cal">
                    <Calendar
                        view="week"
                        isReadOnly='true'
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
                    />
                </div>
                <div className="select-style ">
                    <div className="innerSelect flex-column p-3">
                        <h5>Courses</h5>
                        <Multiselect
                            options={this.state.courses}
                            isObject={false}
                            onSelect={(e) => this.addToSelectedCourses(e)}
                            onRemove={(e) => this.removeFromSelectedCourses(e)}
                            displayValue="course_name"
                            ref={this.multiselectRef}
                            placeholder="Select Courses"
                        />
                    </div>


                    <div className="instructors d-flex flex-column ">
                        <h5 className="mb-2">Instructors</h5>
                        <div className="inside-instructors">
                            {this.state.selectedCourses.length ? this.state.selectedCourses.map((item) => {

                                return (
                                    <article>
                                        <h6 className="mt-2 fw-normal">{item.course_name} - {item.name}</h6>
                                        <div className="info d-flex flex-column ovr" >
                                            {item.lectures.map((lec) => {
                                                return (
                                                    <div className="d-flex flex-row-reverse w-100 justify-content-between gap-5 ">
                                                        <input
                                                            className="form-check-input "
                                                            type="checkbox"
                                                            value={lec.id}
                                                            name=""
                                                            id="flexCheckDefault"
                                                            onChange={this.handleCheckbox}
                                                        />
                                                        <label className="form-check-label fw-normal" htmlFor="flexCheckDefault" >
                                                            {lec.classes[0].lecturer}
                                                        </label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </article>
                                )
                            })
                                : "No courses selected"}
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default Schedule;
