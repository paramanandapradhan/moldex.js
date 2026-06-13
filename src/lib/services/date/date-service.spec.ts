import { describe, it, expect } from 'vitest';
import moment from 'moment';
import {
	PeriodEnum,
	getDateTime,
	yearsDiff,
	daysDiff,
	minutesDiff,
	getPeriodDates,
	padTo2Digits,
	millisToTimeString,
	timestampToMillis,
	dateToTimestamp,
	millisToDateString,
	millisToDate,
	dateFormat,
	isDateBetween,
	toDate,
	formatDuration
} from './date-service';

describe('getDateTime', () => {
	it('reads time from strings, Dates and firestore-like timestamps', () => {
		const d = new Date('2024-01-01T00:00:00.000Z');
		expect(getDateTime(d)).toBe(d.getTime());
		expect(getDateTime('2024-01-01T00:00:00.000Z')).toBe(d.getTime());
		expect(getDateTime({ seconds: 10, nanoseconds: 0 })).toBe(10000);
	});
	it('returns 0 for falsy / unsupported input', () => {
		expect(getDateTime(null)).toBe(0);
		expect(getDateTime(undefined)).toBe(0);
		expect(getDateTime(0)).toBe(0);
	});
});

describe('diff helpers', () => {
	it('computes positive and negative differences', () => {
		const start = new Date('2024-01-11T00:00:00');
		const end = new Date('2024-01-01T00:00:00');
		expect(daysDiff(start, end)).toBe(10);
		expect(daysDiff(end, start)).toBe(-10);
	});
	it('computes years and minutes', () => {
		expect(yearsDiff(new Date('2024-01-01'), new Date('2020-01-01'))).toBe(4);
		expect(minutesDiff(new Date('2024-01-01T01:00:00'), new Date('2024-01-01T00:00:00'))).toBe(60);
	});
});

describe('getPeriodDates', () => {
	const ref = new Date('2024-06-15T10:30:00');

	it('returns the full current day for TODAY/DATE', () => {
		for (const p of [PeriodEnum.TODAY, PeriodEnum.DATE]) {
			const { startDate, endDate } = getPeriodDates(p, new Date(ref));
			expect(startDate?.getHours()).toBe(0);
			expect(startDate?.getMinutes()).toBe(0);
			expect(endDate?.getHours()).toBe(23);
			expect(endDate?.getMinutes()).toBe(59);
		}
	});
	it('returns the current month bounds', () => {
		const { startDate, endDate } = getPeriodDates(PeriodEnum.THIS_MONTH, new Date(ref));
		expect(startDate?.getDate()).toBe(1);
		expect(startDate?.getMonth()).toBe(5); // June (0-based)
		expect(endDate?.getDate()).toBe(30); // June has 30 days
	});
	it('returns the current year bounds', () => {
		const { startDate, endDate } = getPeriodDates(PeriodEnum.THIS_YEAR, new Date(ref));
		expect(startDate?.getMonth()).toBe(0);
		expect(startDate?.getDate()).toBe(1);
		expect(endDate?.getMonth()).toBe(11);
		expect(endDate?.getDate()).toBe(31);
	});
	it('returns nulls for an unknown period', () => {
		expect(getPeriodDates(999 as unknown as number, new Date(ref))).toEqual({
			startDate: null,
			endDate: null
		});
	});
});

describe('padTo2Digits', () => {
	it('pads single digits, leaves doubles', () => {
		expect(padTo2Digits(0)).toBe('00');
		expect(padTo2Digits(5)).toBe('05');
		expect(padTo2Digits(12)).toBe('12');
	});
});

describe('millisToTimeString', () => {
	it('formats hh:mm:ss', () => {
		expect(millisToTimeString(0)).toBe('00:00:00');
		expect(millisToTimeString(3661000)).toBe('01:01:01');
	});
	it('rolls hours over 24', () => {
		expect(millisToTimeString(24 * 3600 * 1000)).toBe('00:00:00');
	});
});

describe('timestamp helpers', () => {
	it('converts firestore-like timestamps to millis', () => {
		expect(timestampToMillis({ seconds: 10, nanoseconds: 0 })).toBe(10000);
		expect(timestampToMillis({ seconds: 1, nanoseconds: 500000000 })).toBe(1500);
	});
	it('returns undefined for invalid timestamps', () => {
		expect(timestampToMillis(null)).toBeUndefined();
		expect(timestampToMillis({})).toBeUndefined();
	});
	it('round-trips Date -> timestamp -> millis', () => {
		const d = new Date('2024-01-01T00:00:00.000Z');
		const ts = dateToTimestamp(d);
		expect(ts.nanoseconds).toBe(0);
		expect(timestampToMillis(ts)).toBe(d.getTime());
	});
});

describe('millis <-> date', () => {
	it('millisToDate returns a Date, undefined for 0', () => {
		expect(millisToDate(1000)).toEqual(new Date(1000));
		expect(millisToDate(0)).toBeUndefined();
	});
	it('millisToDateString matches the documented format', () => {
		const millis = new Date('2024-01-02T15:04:00').getTime();
		expect(millisToDateString(millis)).toBe(moment(new Date(millis)).format('MM-DD-YYYY hh:mm a'));
		expect(millisToDateString(0)).toBeUndefined();
	});
});

describe('dateFormat', () => {
	it('formats with the requested pattern', () => {
		const d = new Date('2024-01-02T15:04:00');
		expect(dateFormat(d, 'YYYY-MM-DD')).toBe('2024-01-02');
		expect(dateFormat(d)).toBe(moment(d).format('MM-DD-YYYY hh:mm a'));
	});
});

describe('isDateBetween', () => {
	const start = new Date('2024-01-01');
	const end = new Date('2024-12-31');
	it('is inclusive of start and exclusive of end', () => {
		expect(isDateBetween(new Date('2024-06-01'), start, end)).toBe(true);
		expect(isDateBetween(start, start, end)).toBe(true);
		expect(isDateBetween(end, start, end)).toBe(false);
		expect(isDateBetween(new Date('2025-01-01'), start, end)).toBe(false);
	});
});

describe('toDate', () => {
	it('passes through Date instances', () => {
		const d = new Date('2024-01-01');
		expect(toDate(d)).toBe(d);
	});
	it('converts millis (number) and numeric strings', () => {
		expect(toDate(1000)).toEqual(new Date(1000));
		expect(toDate('1000')).toEqual(new Date(1000));
	});
	it('parses date strings', () => {
		expect(toDate('2024-01-02')).toEqual(moment('2024-01-02').toDate());
	});
	it('returns undefined for falsy values', () => {
		expect(toDate(null)).toBeUndefined();
		expect(toDate('')).toBeUndefined();
	});
});

describe('formatDuration', () => {
	it('formats mm:ss under an hour', () => {
		expect(formatDuration(0)).toBe('00:00');
		expect(formatDuration(59)).toBe('00:59');
		expect(formatDuration(90)).toBe('01:30');
	});
	it('formats hh:mm:ss at/over an hour', () => {
		expect(formatDuration(3661)).toBe('01:01:01');
	});
	it('clamps negative input to zero', () => {
		expect(formatDuration(-5)).toBe('00:00');
	});
});
