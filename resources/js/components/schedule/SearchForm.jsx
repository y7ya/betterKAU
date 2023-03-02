import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Card, Form, Button } from "react-bootstrap";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SearchFrom = ({ addCourse, removeCourse }) => {
    const tagifyRef = useRef();

    const handleAdd = async (e) => {
        let course = await getCourseData(e.detail.data.value);
        if (course) addCourse(course);
    };

    const handleRemove = (e) => {
        if (e.detail.data.value) removeCourse(e.detail.data.value);
    };

    const getCourseData = async (course) => {
        const promise = fetch("course/" + course, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
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
        <Card className="p-3">
            <Toaster  toastOptions={{ style: { direction: "rtl", }, }} />
            <h5 dir="rtl">المواد</h5>
            <Tags settings={{ "editTags" : false }} className="w-100" placeholder="CPIT-305" dir="ltr" tagifyRef={tagifyRef} onAdd={handleAdd} onRemove={handleRemove} />
        </Card>
    );
};

export default SearchFrom;
