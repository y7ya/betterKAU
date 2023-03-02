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
import { theme } from "./theme";
import { courseToAppointment } from "../../utils.js";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import DoorFrontOutlinedIcon from "@mui/icons-material/DoorFrontOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MoreOutlinedIcon from "@mui/icons-material/MoreOutlined";

const Schedule = ({ selectedLectures }) => {
    const currentDate = "1337-02-03";
    let schedulerData = [...courseToAppointment(selectedLectures)];

    const app = ({ children, style, ...restProps }) => (
        <Appointments.Appointment {...restProps} style={{ ...style, backgroundColor: restProps.data.color }} >
            {children}
        </Appointments.Appointment>
    );

    const tooltipContent = ({ appointmentData }) => (
        <div dir="rtl" className="px-2 pt-2 pb-1" style={{ borderRight: `5px solid ${appointmentData.color}` }}>
            <h5>{appointmentData.title}</h5>
            {appointmentData.refrenceNumber && (
                <div>
                    <div className="d-inline-flex ">
                        <SearchOutlinedIcon className="mx-2" />
                        <lable>{appointmentData.refrenceNumber}</lable>
                    </div>
                    <br />
                </div>
            )}

            {appointmentData.name && (
                <div>
                    <div className="d-inline-flex ">
                        <BadgeOutlinedIcon className="mx-2" />
                        <lable>{appointmentData.name}</lable>
                    </div>
                    <br />
                </div>
            )}

            {appointmentData.building && (
                <div>
                    <div className="d-inline-flex  text-nowrap">
                        <ApartmentOutlinedIcon className="mx-2" />
                        <lable>{appointmentData.building}</lable>
                    </div>
                    <br />
                </div>
            )}
            {appointmentData.room && (
                <div>
                    <div className="d-inline-flex ">
                        <DoorFrontOutlinedIcon className="mx-2" />
                        <lable>{appointmentData.room}</lable>
                    </div>
                    <br />
                </div>
            )}
            {appointmentData.lecturer && (
                <div>
                    <div className="d-inline-flex">
                        <AccountCircleOutlinedIcon className="mx-2" />
                        <lable>{appointmentData.lecturer}</lable>
                    </div>
                    <br />
                </div>
            )}

            {appointmentData.term["number"] &&
                appointmentData.refrenceNumber && (
                    <div className="d-inline-flex">
                        <MoreOutlinedIcon className="mx-2" />
                        <lable>
                            <a href={"https://odusplus-ss.kau.edu.sa/PROD/xwckschd.p_disp_detail_sched?term_in=" + appointmentData.term["number"] + "&crn_in=" + appointmentData.refrenceNumber} target="_blank" >
                                للمزيد
                            </a>
                        </lable>
                    </div>
                )}
        </div>
    );

    return (
        <div>
            <Card>
                <Toaster toastOptions={{style: {direction: "rtl",}}} />
                <Scheduler height={800} data={schedulerData}>
                    <ViewState currentDate={currentDate} />
                    <WeekView cellDuration={60} startDayHour={7} endDayHour={24} excludedDays={[5, 6]} />
                    <Appointments appointmentComponent={app} />
                    <AppointmentTooltip headerComponent={() => {}} contentComponent={tooltipContent} />
                </Scheduler>
            </Card>
        </div>
    );
};

export default Schedule;
