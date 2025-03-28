
import moment, { type unitOfTime } from "moment";


export class PeriodEnum {
    static TODAY = 1;
    static TOMORROW = 2;
    static YESTERDAY = 3;
    static THIS_WEEK = 4;
    static LAST_WEEK = 5;
    static NEXT_WEEK = 6;
    static THIS_MONTH = 7;
    static LAST_MONTH = 8;
    static NEXT_MONTH = 9;
    static THIS_YEAR = 10;
    static LAST_YEAR = 11;
    static NEXT_YEAR = 12;
    static DATE = 13;
}

export type FirestoreTimestamp = { seconds: number, nanoseconds: number };

export function getDateWith(yearChange: number) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + yearChange);
    return date;
}

export function getDateTime(date: string | Date | any): number {
    if (date) {
        if (typeof date == 'string') {
            return new Date(date).getTime();
        } else if (date instanceof Date) {
            return date.getTime();
        } else if (date.seconds) {
            return timestampToMillis(date) || 0;
        }
    }
    return 0
}

export function momentDiff({ startDate, endDate, unit }: { startDate: Date, endDate?: Date, unit: unitOfTime.Diff }) {
    if (endDate) {
        return moment(startDate).diff(moment(endDate), unit)
    } else {
        return moment().diff(moment(startDate), unit)
    }
}

export function yearsDiff(startDate: Date, endDate?: Date) {
    return momentDiff({ startDate, endDate, unit: 'y' })
}

export function monthsDiff(startDate: Date, endDate?: Date) {
    return momentDiff({ startDate, endDate, unit: 'M' })
}

export function daysDiff(startDate: Date, endDate?: Date) {
    return momentDiff({ startDate, endDate, unit: 'd' })
}

export function hoursDiff(startDate: Date, endDate?: Date) {
    return momentDiff({ startDate, endDate, unit: 'h' })
}
export function minutesDiff(startDate: Date, endDate?: Date) {
    return momentDiff({ startDate, endDate, unit: 'm' })
}



export function getPeriodDates(period: PeriodEnum, currentDate: Date = new Date()) {
    const currentDate1 = moment(currentDate);
    const currentDate2 = moment(currentDate);
    let startDate, endDate;

    switch (period) {
        case PeriodEnum.DATE:
        case PeriodEnum.TODAY:
            startDate = currentDate1.startOf('day');
            endDate = currentDate2.endOf('day');
            break;
        case PeriodEnum.TOMORROW:
            startDate = currentDate1.add(1, 'day').startOf('day');
            endDate = currentDate2.add(1, 'day').endOf('day');
            break;
        case PeriodEnum.YESTERDAY:
            startDate = currentDate1.subtract(1, 'day').startOf('day');
            endDate = currentDate2.subtract(1, 'day').endOf('day');
            break;
        case PeriodEnum.THIS_WEEK:
            startDate = currentDate1.startOf('week');
            endDate = currentDate2.endOf('week');
            break;
        case PeriodEnum.LAST_WEEK:
            startDate = currentDate1.subtract(1, 'week').startOf('week');
            endDate = currentDate2.subtract(1, 'week').endOf('week');
            break;
        case PeriodEnum.NEXT_WEEK:
            startDate = currentDate1.add(1, 'week').startOf('week');
            endDate = currentDate2.add(1, 'week').endOf('week');
            break;
        case PeriodEnum.THIS_MONTH:
            startDate = currentDate1.startOf('month');
            endDate = currentDate2.endOf('month');
            break;
        case PeriodEnum.NEXT_MONTH:
            startDate = currentDate1.add(1, 'month').startOf('month');
            endDate = currentDate2.add(1, 'month').endOf('month');
            break;
        case PeriodEnum.LAST_MONTH:
            startDate = currentDate1.subtract(1, 'month').startOf('month');
            endDate = currentDate2.subtract(1, 'month').endOf('month');
            break;
        case PeriodEnum.THIS_YEAR:
            startDate = currentDate1.startOf('year');
            endDate = currentDate2.endOf('year');
            break;
        case PeriodEnum.LAST_YEAR:
            startDate = currentDate1.subtract(1, 'year').startOf('year');
            endDate = currentDate2.subtract(1, 'year').endOf('year');
            break;
        case PeriodEnum.NEXT_YEAR:
            startDate = currentDate1.add(1, 'year').startOf('year');
            endDate = currentDate2.add(1, 'year').endOf('year');
            break;

        default:
            startDate = null;
            endDate = null;
            break;
    }

    return {
        startDate: startDate ? startDate.toDate() : null,
        endDate: endDate ? endDate.toDate() : null,
    };
}



export function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}


export function millisToTimeString(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
        seconds,
    )}`;
}


export function timestampToMillis(timestamp: any) {
    if (timestamp && timestamp.seconds) {
        return (timestamp.seconds * 1000) + (timestamp.nanoseconds / 1000000);
    }
}

export function timestampToDate(timestamp: FirestoreTimestamp) {
    if (timestamp && timestamp.seconds) {
        return new Date((timestamp.seconds * 1000) + (timestamp.nanoseconds / 1000000));
    }
}

export function timestampToDateString(timestamp: FirestoreTimestamp) {
    if (timestamp && timestamp.seconds) {
        return moment(new Date(timestamp.seconds * 1000)).format('MM-DD-YYYY hh:mm a')
    }
}

export function timestampToAgo(timestamp: FirestoreTimestamp) {
    if (timestamp && timestamp.seconds) {
        return moment(new Date(timestamp.seconds * 1000)).fromNow();
    }
}

export function dateToTimestamp(date: Date) {
    return { seconds: date.getTime() / 1000, nanoseconds: 0 };
}

export function dateToAgo(date: Date) {
    if (date) {
        return moment(date).fromNow();
    }
}

export function millisToDateString(millis: number) {
    if (millis) {
        return moment(new Date(millis)).format('MM-DD-YYYY hh:mm a');
    }
}



export function millisToDate(millis: number) {
    if (millis) {
        return new Date(millis);
    }
}

export function dateFormat(date: Date, format: 'MM-DD-YYYY hh:mm a' | 'MM-DD-YYYY' | 'YYYY-MM-DD' | 'YYYY-MM-DDTHH:MM' | string = 'MM-DD-YYYY hh:mm a') {
    if (date) {
        return moment(date).format(format)
    }
}

export function isDateBetween(date: Date, startDate: Date, endDate: Date) {
    const targetDate = date;
    return targetDate >= startDate && targetDate < endDate;
}

export function toDate(value: any) {
    let result: Date | null | undefined = undefined;
    if (value) {
        if (value instanceof Date) {
            result = value;
        } else if (typeof value == 'number') {
            result = millisToDate(value);
        } else if (typeof value == 'string' && !isNaN(value as any)) {
            result = millisToDate(parseInt(value));
        } else if (typeof value == 'string') {
            result = moment(value).toDate();
        } else if ((value as any).seconds) {
            result = timestampToDate(value as any);
        }
    }
    return result;
}
