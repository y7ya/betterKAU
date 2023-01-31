import Collapsible from "react-collapsible"; // https://github.com/glennflanagan/react-collapsible
import { Row, Card, Form, Button } from "react-bootstrap";

const LectureItem = () => {
    return (
        <Collapsible open="true" trigger="CPIT-305 | برمجة متقدمة">
            <div dir="rtl" className="">
                <div className="rtl">
                    <Form.Check
                        className="ms-2"
                        inline
                        name="group1"
                        type="radio"
                        id="val1"
                    />
                    <label
                        dir="rtl"
                        className="form-check-label fw-normal"
                        htmlFor="val1"
                    >
                        5439 | مد عبدالحميد
                    </label>
                </div>
                <div className="">
                    <Form.Check
                        className="ms-2"
                        inline
                        name="group1"
                        type="radio"
                        id="val2"
                    />
                    <label
                        dir="rtl"
                        className="form-check-label fw-normal"
                        htmlFor="val2"
                    >
                        5439 | مد عبدالحميد
                    </label>
                </div>
                <div className="">
                    <Form.Check
                        className="ms-2"
                        inline
                        name="group1"
                        type="radio"
                        id="val3"
                    />
                    <label
                        dir="rtl"
                        className="form-check-label fw-normal"
                        htmlFor="val3"
                    >
                        5439 | مد عبدالحميد
                    </label>
                </div>
            </div>
        </Collapsible>
    );
};

export default LectureItem;