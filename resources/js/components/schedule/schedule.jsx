import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import React, { Component, useEffect, useState, useRef } from "react";
import "../../../css/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tags from "@yaireo/tagify/dist/react.tagify";
import toast, { Toaster } from "react-hot-toast";
import "@yaireo/tagify/dist/tagify.css";
import { Row, Card, Form, Button } from "react-bootstrap";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
    Scheduler,
    WeekView,
    Appointments,
    AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";

const Schedule = ({ selectedCourses }) => {
    const currentDate = "1337-02-03";


    const dayletterToNumber = (dayLetter) => {
        switch (dayLetter) {
            case 'U': // sunday
                return '3'
            case 'M': // monday
                return '4'
            case 'T': // tuesday
                return '5'
            case 'W': // wednesday
                return '6'
            case 'R': // thursday
                return '7'
            case 'F': // friday
                return '8'
            case 'S': // saturday
                return '9'

            default:
                break;
        }
    }
    const courseToAppointment = () => {
        if (!selectedCourses?.length) return [];
        let courseData = [];
        selectedCourses.forEach((course) => {
            let classData = course.lecture['classes'].map((classs) => {
                return {
                    id: classs.id,
                    lecture_id: course.lecture.id,
                    title: `${course.name} | ${classs.lecturer}`,
                    course: "",
                    startDate: `1337-02-0${dayletterToNumber(classs.day)}T${classs.time_start}`,
                    endDate: `1337-02-0${dayletterToNumber(classs.day)}T${classs.time_end}`,
                    location: "Building 51 | room :16",
                    color: '#fff'
                };
            });
            courseData.push(...classData);
        });
        return courseData;
    };

    let schedulerData = [...courseToAppointment()];

    const checkForSimilarties = (schedulerData) => {
        let NoOverlapping = schedulerData;
        let check = true;

        for (let i = 0; i < schedulerData.length - 1; i++) {
            for (let j = i + 1; j < schedulerData.length; j++) {
                if (schedulerData[i].lecture_id !== schedulerData[j].lecture_id &&
                    schedulerData[i].startDate < schedulerData[j].endDate &&
                    schedulerData[j].startDate < schedulerData[i].endDate) {
                    /* YOU CAN HIDE THE OVERLAPPING COURSES BUT LIMITED TO TWO 
                    NoOverlapping = schedulerData.filter((item) => item.lecture_id != schedulerData[j].lecture_id)
                    */
                    check = false;
                }
            }
        }
        useEffect(() => {
            if (!check && NoOverlapping.length) {
                toast.error("لديك تعارض في احدى المواد....")
            } else if (NoOverlapping.length) {
                toast.success("جدولك صحيح...")
            }
        })

        return NoOverlapping;
    }

    const noOverlapschedule = checkForSimilarties(schedulerData)



    return (
        <div>
            <Card>
                <Toaster
                    toastOptions={{
                        style: {
                            direction: "rtl",
                        },
                    }}
                />
                <Scheduler height={800} data={noOverlapschedule}>
                    <ViewState currentDate={currentDate} />
                    <WeekView
                        cellDuration={60}
                        startDayHour={7}
                        endDayHour={24}
                    />
                    <Appointments />
                    <AppointmentTooltip />
                </Scheduler>
                {/*                 <button onClick={console.log(checkForSimilarties(schedulerData))}>Click</button>
 */}            </Card>
        </div>
    );
};

export default Schedule;
