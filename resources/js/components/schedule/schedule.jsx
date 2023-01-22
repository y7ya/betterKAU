import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import Multiselect from "multiselect-react-dropdown";
import React, { Component, useEffect, useState } from "react";
import "../../../css/app.css";

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.calendarRef = React.createRef();
        this.multiselectRef = React.createRef();


        function getOptions() {
            return [
                { department: "CPIT", name: "CPIT305", id: 1 },
                { department: "CPCS", name: "CPCS210", id: 2 },
                { department: "EE", name: "EE205", id: 3 },
                { department: "EE", name: "EE250", id: 4 },
            ];
        }

        function getInstructors() {
            return [
                {
                    name: "Ahmed Al-ghamdi",
                    calendarId: "cal1",
                    course: "CPIT305",
                    id: "678910",
                    check: false,
                    days: ["U", "T", "R"],
                    startTime: "08:00",
                    endTime: "09:40",
                },
                {
                    name: "Thamer",
                    calendarId: "cal1",
                    course: "EE205",
                    id: "677810",
                    check: false,
                    days: ["M", "W"],
                    startTime: "13:00",
                    endTime: "14:30",
                },
                {
                    name: "Khaled",
                    calendarId: "cal1",
                    course: "EE205",
                    id: "678111",
                    check: false,
                    days: ["U", "T", "R"],
                    startTime: "08:00",
                    endTime: "09:40",
                },
                {
                    name: "Malek",
                    calendarId: "cal1",
                    course: "CPCS210",
                    id: "677814",
                    check: false,
                    days: ["U", "T", "R"],
                    startTime: "08:00",
                    endTime: "09:40",
                },
                {
                    name: "Umair",
                    calendarId: "cal1",
                    course: "EE250",
                    id: "674139",
                    check: false,
                    days: ["U", "T", "R"],
                    startTime: "08:00",
                    endTime: "09:40",
                },
            ];
        }

        this.state = {

            // options or courses is the second box, will show the courses
            options: getOptions(),

            // state to know the sleceted department so we can filter above courses ^
            selectedDep: "Not available",

            instructors: getInstructors(),

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
        this.setState((prevState) => ({
            instructors: prevState.instructors.map((obj) => {
                return obj.name === event.target.value
                    ? Object.assign(obj, { check: event.target.checked })
                    : obj;
            }),
        }));

        setTimeout(() => {
            for (
                let index = 0;
                index < this.state.instructors.length;
                index++
            ) {
                if (this.state.instructors[index].check) {
                    let evt = this.calendar.getEvent(
                        this.state.instructors[index].id,
                        this.state.instructors[index].calendarId
                    );
                    /* console.log(evt); */

                    if (evt === null) {
                        console.log(this.state.instructors[index].name);

                        let color =
                            "#" +
                            Math.floor(Math.random() * 16777215).toString(16);
                        this.state.instructors[index].days.forEach(
                            (element) => {
                                let day;
                                switch (element) {
                                    case "U":
                                        day = 5;
                                        break;
                                    case "M":
                                        day = 6;
                                        break;
                                    case "T":
                                        day = 7;
                                        break;
                                    case "W":
                                        day = 8;
                                        break;
                                    case "R":
                                        day = 9;
                                        break;
                                    default:
                                        break;
                                }
                                /*console.log(this.state.instructors[index].startTime); */
                                this.calendar.createEvents([
                                    {
                                        id: this.state.instructors[index].id,
                                        calendarId: "cal1",
                                        title: this.state.instructors[index]
                                            .course,
                                        start: `2023-03-0${day}T${this.state.instructors[index].startTime}:00`,
                                        location: "Buliding 31",
                                        state: "Available",
                                        end: `2023-03-0${day}T${this.state.instructors[index].endTime}:00`,
                                        backgroundColor: color,
                                        color: "#fff",
                                        isReadOnly: true,
                                        attendees: ["A", "B", "C"],
                                        useFormPopup: true,
                                    },
                                ]);
                                this.calendar.openFormPopup({
                                    id: this.state.instructors[index].id,
                                    calendarId: "cal1",
                                    title: "dfsdfsd",
                                    start: this.state.instructors[index]
                                        .startTime,
                                    end: this.state.instructors[index].endTime,
                                    category: "time",
                                });
                            }
                        );
                    }
                } else if (
                    !this.state.instructors[index].check &&
                    this.state.instructors[index].name === event.target.value
                ) {
                    this.state.instructors[index].days.forEach((element) => {
                        let evt = this.calendar.getEvent(
                            this.state.instructors[index].id,
                            this.state.instructors[index].calendarId
                        );
                        this.calendar.deleteEvent(evt.id, "cal1");
                    });
                }
            }
        }, 0);
    };

    render() {
        return (
            <div className="App">
                <div className="cal">
                    <Calendar
                        view="week"
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
                <div className="select-style">
                    <div className="innerSelect">
                        <Multiselect
                            options={this.state.options}
                            onSelect={(e) =>
                                this.setState({
                                    ...this.state,
                                    selectedCourses: e,
                                })
                            }
                            onRemove={(e) =>
                                this.setState({
                                    ...this.state,
                                    selectedCourses: e,
                                })
                            }
                            displayValue="name"
                            ref={this.multiselectRef}
                            placeholder="Select Courses"
                        />
                    </div>

                    {this.state.selectedCourses.length ? (
                        <div className="instructors">
                            {this.state.selectedCourses.length
                                ? this.state.selectedCourses.map((item) => {
                                      return this.state.instructors.map(
                                          (ins) => {
                                              if (ins.course === item.name) {
                                                  return (
                                                      <div
                                                          className="info"
                                                          key={ins.id}
                                                      >
                                                          <p>{item.name}</p>
                                                          <p className="name">
                                                              {ins.name} /{" "}
                                                              {ins.id}
                                                          </p>
                                                          <input
                                                              type="checkbox"
                                                              value={ins.name}
                                                              name=""
                                                              id=""
                                                              onChange={
                                                                  this
                                                                      .handleCheckbox
                                                              }
                                                              checked={
                                                                  ins.check
                                                              }
                                                          />
                                                      </div>
                                                  );
                                              }
                                          }
                                      );
                                  })
                                : "No courses selected"}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    }
}

export default Schedule;
