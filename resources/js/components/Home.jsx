import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import React, { useEffect, useState, createContext } from "react";
import "../../css/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row } from "react-bootstrap";
import Schedule from "./schedule/schedule";
import SearchForm from "./schedule/SearchForm";
import CoursesList from "./schedule/CoursesList";
import Footer from "./layouts/Footer";
import { theme } from "./schedule/theme";

// app context used to make state shared across copmonents ==> reduces prop drilling 
export const AppContext = createContext(null);

const Home = () => {
    const [courses, setCourses] = useState(
        JSON.parse(localStorage.getItem("courses"))
            ? JSON.parse(localStorage.getItem("courses"))
            : []
    );
    const [selectedLectures, setSelectedLectures] = useState(
        JSON.parse(localStorage.getItem("selectedLectures"))
            ? JSON.parse(localStorage.getItem("selectedLectures"))
            : []
    );

    const colors = [
        "gray",
        "teal",
        "red",
        "brown",
        "purple",
        "green",
        "yellowgreen",
    ];

    let currentColors = localStorage.getItem("currentColors");
    const getColor = () => {
        currentColors++;
        localStorage.setItem("currentColors", currentColors);
        return colors[Math.floor(currentColors % colors.length)];
    };

    const addCourse = (course) => {
        course.color = getColor();
        setCourses((courses) => [course, ...courses]);
    };

    const removeCourse = (removeCourse) => {
        setCourses((courses) =>
            [...courses].filter(
                (course) =>
                    course.course + "-" + course.number !=
                    removeCourse.toUpperCase()
            )
        );
        removeSelectedLectures(removeCourse);
    };

    const addSelectedLectures = (selectedLecture) => {
        setSelectedLectures((selectedLectures) => [
            selectedLecture,
            ...selectedLectures.filter(
                (course) => course.id != selectedLecture.id
            ),
        ]);
    };

    const removeSelectedLectures = (removeSelectedLecture) => {
        setSelectedLectures((selectedLectures) =>
            [...selectedLectures].filter(
                (selectedLecture) =>
                    selectedLecture.course + "-" + selectedLecture.number !=
                    removeSelectedLecture.toUpperCase()
            )
        );
    };

    useEffect(() => {
        localStorage.setItem("courses", JSON.stringify(courses));
        localStorage.setItem(
            "selectedLectures",
            JSON.stringify(selectedLectures)
        );
    }, [courses, selectedLectures]);

    const [checked, setChecked] = useState(false);


    return (
        // the state checked now can be used by any component bellow AppContext.Provider
        <AppContext.Provider value={{ checked, setChecked }}>
            <div className="">
                {/* <Navbar /> */}
                <div className="container phoneSchedule rounded sched-shadwo">
                    <Row className="p-0 m-0">
                        <div className="order-2 order-md-1 col-md-9 col-sm-12 p-0">
                            <Schedule selectedLectures={selectedLectures} />
                        </div>
                        <div className="order-1 order-md-2 col-md-3 col-sm-12">
                            <SearchForm
                                addCourse={addCourse}
                                removeCourse={removeCourse}
                                courses={courses}
                            />
                            <CoursesList
                                courses={courses}
                                addSelectedLectures={addSelectedLectures}
                                selectedLectures={selectedLectures}
                                removeSelectedLectures={removeSelectedLectures}
                            />
                        </div>
                    </Row>
                </div>
                <Footer />
            </div>
        </AppContext.Provider>
    );
};

export default Home;
