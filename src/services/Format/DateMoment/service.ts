import moment from "moment";

const dateMoment = (date: string) => {
    return moment(date).fromNow();
};

export default dateMoment;
