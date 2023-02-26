export const dayletterToNumber = (dayLetter) => {
    switch (dayLetter) {
        case "U": // sunday
            return "3";
        case "M": // monday
            return "4";
        case "T": // tuesday
            return "5";
        case "W": // wednesday
            return "6";
        case "R": // thursday
            return "7";
        case "F": // friday
            return "8";
        case "S": // saturday
            return "9";

        default:
            break;
    }
};

export const courseToAppointment = (selectedLectures) => {
    if (!selectedLectures?.length) return [];
    let courseData = [];
    selectedLectures.forEach((course) => {
        let classData = course.lecture["classes"].map((classs) => {
            return {
                id: classs.id,
                lecture_id: course.lecture.id,
                title: `${course.course}-${course.number} | ${classs.lecturer}`,
                course: "",
                startDate: `1337-02-0${dayletterToNumber(classs.day)}T${
                    classs.time_start
                }`,
                endDate: `1337-02-0${dayletterToNumber(classs.day)}T${
                    classs.time_end
                }`,
                location: `Building ${course.building} | Room ${course.room}`,
                color:course.color
            };
        });
        courseData.push(...classData);
    });
    return courseData;
};