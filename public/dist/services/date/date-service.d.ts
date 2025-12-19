import { type unitOfTime } from "moment";
export declare class PeriodEnum {
    static TODAY: number;
    static TOMORROW: number;
    static YESTERDAY: number;
    static THIS_WEEK: number;
    static LAST_WEEK: number;
    static NEXT_WEEK: number;
    static THIS_MONTH: number;
    static LAST_MONTH: number;
    static NEXT_MONTH: number;
    static THIS_YEAR: number;
    static LAST_YEAR: number;
    static NEXT_YEAR: number;
    static DATE: number;
}
export declare function getDateWith(yearChange: number): Date;
export declare function getDateTime(date: string | Date | any): number;
export declare function momentDiff({ startDate, endDate, unit }: {
    startDate: Date;
    endDate?: Date;
    unit: unitOfTime.Diff;
}): number;
export declare function yearsDiff(startDate: Date, endDate?: Date): number;
export declare function monthsDiff(startDate: Date, endDate?: Date): number;
export declare function daysDiff(startDate: Date, endDate?: Date): number;
export declare function hoursDiff(startDate: Date, endDate?: Date): number;
export declare function minutesDiff(startDate: Date, endDate?: Date): number;
export declare function getPeriodDates(period: PeriodEnum, currentDate?: Date): {
    startDate: any;
    endDate: any;
};
export declare function padTo2Digits(num: number): string;
export declare function millisToTimeString(milliseconds: number): string;
export declare function timestampToMillis(timestamp: any): number;
export declare function dateToTimestamp(date: Date): {
    seconds: number;
    nanoseconds: number;
};
export declare function dateToAgo(date: Date): string;
export declare function millisToDateString(millis: number): string;
export declare function millisToDate(millis: number): Date;
export declare function dateFormat(date: Date, format?: 'MM-DD-YYYY hh:mm a' | 'MM-DD-YYYY' | 'YYYY-MM-DD' | 'YYYY-MM-DDTHH:MM' | string): string;
export declare function isDateBetween(date: Date, startDate: Date, endDate: Date): boolean;
export declare function toDate(value: any): Date;
/**
 * Formats a duration in seconds to mm:ss or hh:mm:ss format
 * @param seconds - The duration in seconds
 * @returns Formatted duration string (mm:ss if less than an hour, hh:mm:ss if an hour or more)
 */
export declare function formatDuration(seconds: number): string;
