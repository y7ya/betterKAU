import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import React, { Component, useEffect, useState, useRef, useContext } from "react";
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
import { courseToAppointment, toRamadanTime } from "../../utils.js";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import DoorFrontOutlinedIcon from "@mui/icons-material/DoorFrontOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MoreOutlinedIcon from "@mui/icons-material/MoreOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";
import { AppContext } from "../Home";

const Schedule = ({ selectedLectures }) => {
    const currentDate = "2001-04-01";
    let schedulerData = [...courseToAppointment(selectedLectures)];
    let lowest = 8;
    let highest = 24;
    let scheduleHeight = 16;

    const convertToRamadanTime = () => {
        schedulerData.forEach((classs) => {
            let startTime = classs.startDate;
            let endTime = classs.endDate;
            let ramadanTime = toRamadanTime(startTime, endTime);
            classs.startDate = startTime.add(ramadanTime[0], "m");
            classs.endDate = startTime.clone().add(ramadanTime[1], "m");
        });
    };

    const app = ({ children, style, ...restProps }) => (
        <Appointments.Appointment
            {...restProps}
            style={{ ...style, backgroundColor: restProps.data.color }}
        >
            {children}
        </Appointments.Appointment>
    );

    const tooltipContent = ({ appointmentData }) => (
        <div
            dir="rtl"
            className="px-2 pt-2 pb-1"
            style={{ borderRight: `5px solid ${appointmentData.color}` }}
        >
            <h5>{appointmentData.title}</h5>
            {appointmentData.startDate && appointmentData.endDate && (
                <div>
                    <div className="d-inline-flex">
                        <AccessTimeIcon className="mx-2" />
                        <lable dir="ltr">
                            {appointmentData.startDate.format("hh:mm A") +
                                "-" +
                                appointmentData.endDate.format("hh:mm A")}
                        </lable>
                    </div>
                    <br />
                </div>
            )}
            {appointmentData.refrenceNumber && (
                <div>
                    <div className="d-inline-flex ">
                        <BookmarkBorderOutlinedIcon className="mx-2" />
                        <lable>{appointmentData.refrenceNumber}</lable>
                    </div>
                    <br />
                </div>
            )}

            {appointmentData.term.name && (
                <div>
                    <div className="d-inline-flex ">
                        <ArticleOutlinedIcon className="mx-2" />
                        <lable>{appointmentData.term.name}</lable>
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
                            <a
                                href={
                                    "https://odusplus-ss.kau.edu.sa/PROD/xwckschd.p_disp_detail_sched?term_in=" +
                                    appointmentData.term["number"] +
                                    "&crn_in=" +
                                    appointmentData.refrenceNumber
                                }
                                target="_blank"
                            >
                                للمزيد
                            </a>
                        </lable>
                    </div>
                )}
        </div>
    );

    const manageScheduleStartEnd = () => {
        schedulerData.forEach((classs) => {
            if (!classs.startDate._isValid || !classs.endDate._isValid) return;
            if (!highest || classs.endDate.hours() > highest) {
                let time = classs.endDate.clone().add(moment.duration(classs.endDate.diff(classs.startDate)).asMinutes(), "m");
                highest = time.minute() ? time.clone().add(1, "hour").startOf("hour").hours() : time.clone().startOf("hour").hours();
            }
            if (!highest || classs.startDate.hours() > highest) {
                let time = classs.startDate.clone().add(moment.duration(classs.endDate.diff(classs.startDate)).asMinutes(), "m");
                highest = time.minute() ? time.clone().add(1, "hour").startOf("hour").hours() : time.clone().startOf("hour").hours();
                if (highest < 12) {
                    highest = 24;
                    lowest = 0;
                }
            }
            if (typeof lowest == "undefined" || classs.endDate.hours() < lowest) {
                lowest = classs.endDate.hours();
            }
            if (typeof lowest == "undefined" || classs.startDate.hours() < lowest) {
                lowest = classs.startDate.hours();
            }
        });
    };

    const formatSchedule = () => {
        if (highest - lowest >= scheduleHeight) return;
        let neededOffset = scheduleHeight - (highest - lowest);
        if (lowest - neededOffset >= 0) {
            lowest = lowest - neededOffset;
            return;
        }
        if (highest + neededOffset <= 24) {
            highest = highest + neededOffset;
            return;
        }
        highest = highest + neededOffset;
        if (highest > 24) {
            lowest = lowest - (highest - 24);
            highest = 24;
        }
    };


    // we used checked here to check weather to render ramadan times or not based on the current switch value
    const { checked } = useContext(AppContext);
    if (checked) {
        // fix: recode this part
        convertToRamadanTime();
        manageScheduleStartEnd()
        formatSchedule()
        // end fix: recode this part
    }


    return (
        <>
            <Card className="mt-sm-1">
                <Toaster toastOptions={{ style: { direction: "rtl" } }} />
                <Scheduler data={schedulerData}>
                    <ViewState currentDate={currentDate} />
                    <WeekView
                        cellDuration={60}
                        startDayHour={lowest}
                        endDayHour={highest}
                        excludedDays={[5, 6]}
                    />
                    <Appointments appointmentComponent={app} />
                    <AppointmentTooltip
                        headerComponent={() => { }}
                        contentComponent={tooltipContent}
                    />
                </Scheduler>
            </Card>
        </>
    );
};

export default Schedule;
