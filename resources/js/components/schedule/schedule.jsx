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
import {theme} from './theme'
import {courseToAppointment} from '../../utils.js';

const Schedule = ({ selectedCourses }) => {
    const currentDate = "1337-02-03";
    let schedulerData = [...courseToAppointment(selectedCourses)];

    const checkForSimilarties = (schedulerData) => {
        let NoOverlapping = schedulerData;
        let check = true;

        for (let i = 0; i < schedulerData.length - 1; i++) {
            for (let j = i + 1; j < schedulerData.length; j++) {
                if (
                    schedulerData[i].lecture_id !==
                        schedulerData[j].lecture_id &&
                    schedulerData[i].startDate < schedulerData[j].endDate &&
                    schedulerData[j].startDate < schedulerData[i].endDate
                ) {
                    /* YOU CAN HIDE THE OVERLAPPING COURSES BUT LIMITED TO TWO 
                    NoOverlapping = schedulerData.filter((item) => item.lecture_id != schedulerData[j].lecture_id)
                    */
                    check = false;
                }
            }
        }
        useEffect(() => {
            if (!check && NoOverlapping.length) {
                toast.error("لديك تعارض في احدى المواد....");
            } else if (NoOverlapping.length) {
                toast.success("جدولك صحيح...");
            }
        });

        return NoOverlapping;
    };

    const noOverlapschedule = checkForSimilarties(schedulerData);

    const app = ({ children, style, ...restProps }) => (
        <Appointments.Appointment
            {...restProps}
            style={{ ...style, backgroundColor: restProps.data.color }}
        >
            {children}
        </Appointments.Appointment>
    );

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
                        excludedDays={[5,6]}
                    />
                    <Appointments appointmentComponent={app} />
                    {/* <AppointmentTooltip /> */}
                </Scheduler>
            </Card>
        </div>
    );
};

export default Schedule;
