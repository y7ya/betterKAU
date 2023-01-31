import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Card, Form, Button } from "react-bootstrap";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";

const SearchFrom = () => {
    return (
        <Card className="p-3">
            <h5 dir="rtl">المواد</h5>
            <Tags className="w-100" placeholder="CPIT-305" dir="ltr" />
        </Card>
    );
};

export default SearchFrom;