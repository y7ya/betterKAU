import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Card, Form, Button } from "react-bootstrap";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const SearchFrom = ({ addCourse, removeCourse,courses }) => {
    const tagifyRef = useRef();

    const handleAdd = async (e) => {
        let course = await getCourseData(e.detail.data.value);
        if (course) addCourse(course);
    };

    const handleRemove = (e) => {
        if (e.detail.data.value) removeCourse(e.detail.data.value);
    };

    const getCourseData = async (course) => {
        const promise = axios.post(
            "/course",
            { course: course },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((res) => res.data)
        .then((res) => {
            if (!res.message) return res;
            throw Error(res.message);
        });

        try {
            const data = await toast.promise(promise, {
                loading: "جاري اضافة المادة...",
                success: "تم اضافة المادة",
                error: (err) => {
                    tagifyRef.current.removeTags();
                    return err.message;
                },
            });
            return data;
        } catch (error) {}
    };


    return (
        <Card className="p-2">
            <Toaster toastOptions={{ style: { direction: "rtl" } }} />
            <div className="d-flex align-items-center gap-2" dir="rtl">
            <h5 dir="rtl">المواد</h5>
            <label className="text-muted" style={{fontSize:12}}>(الفصل الدراسي الصيفي 2023)</label>
            </div>
            <Tags
                settings={{ editTags: false}}
                className="w-100"
                placeholder="ISLS-201"
                dir="ltr"
                tagifyRef={tagifyRef}
                onAdd={handleAdd}
                onRemove={handleRemove}
                autoFocus={true}
                defaultValue={courses.map(course=> course.course + "-" + course.number)}
            />
        </Card>
    );
};

export default SearchFrom;
