import { format, differenceInDays } from "date-fns";

function timestampToYYYYMMDD(_date, _format) {
    let formatdate = "";
    try {
        formatdate = format(new Date(_date), _format);
    } catch (err) {
        console.log(err);
    }

    return formatdate;
}

export default {
    timestampToYYYYMMDD,
}