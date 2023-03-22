import moment from "moment";

export const dayletterToNumber = (dayLetter) => {
    switch (dayLetter) {
        case "U": // sunday
            return "1";
        case "M": // monday
            return "2";
        case "T": // tuesday
            return "3";
        case "W": // wednesday
            return "4";
        case "R": // thursday
            return "5";
        case "F": // friday
            return "6";
        case "S": // saturday
            return "7";

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
                course: course.course + "-" + course.number,
                refrenceNumber: course.lecture.number,
                lecturer: classs.lecturer,
                startDate: moment(
                    new Date(
                        `2001-04-0${dayletterToNumber(classs.day)}T${
                            classs.time_start
                        }`
                    )
                ),
                endDate: moment(
                    new Date(
                        `2001-04-0${dayletterToNumber(classs.day)}T${
                            classs.time_end
                        }`
                    )
                ),
                building: classs.building,
                room: classs.room,
                name: course.lecture.name,
                term: course.term,
                color: course.color,
            };
        });
        courseData.push(...classData);
    });
    return courseData;
};

export const toRamadanTime = (startTime, endTime) => {
    let classDuration = moment.duration(endTime.diff(startTime)).asMinutes();
    if (startTime.hour() >= 8 && startTime.hour() < 17)
        return [20 * (6 - (startTime.hour() - 8)), classDuration * 0.7];
    return [180 + 20 * (5 - (startTime.hour() - 17)), classDuration * 0.7];
};
