import { MAX_MONTH } from '../constants/date';

export function getPrevYearAndMonth(year, month) {
	const prevMonth = month - 1 <= 0 ? MAX_MONTH : month - 1;
	const prevYear = prevMonth === MAX_MONTH ? year - 1 : year;
	return [prevYear, prevMonth];
}

export function getNextYearAndMonth(year, month) {
	const nextMonth = month + 1 > MAX_MONTH ? 1 : month + 1;
	const nextYear = nextMonth === 1 ? year + 1 : year;
	return [nextYear, nextMonth];
}

export function getFirstDayFromYearMonth(year, month) {
	const firstDateOfMonth = new Date(year, month - 1, 1);
	return firstDateOfMonth.getDay();
}

export function getLastDateFromYearMonth(year, month) {
	const lastDateOfMonth = new Date(year, month, 0);
	return lastDateOfMonth.getDate();
}
