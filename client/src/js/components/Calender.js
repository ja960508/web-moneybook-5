import { MAX_WEEK } from '../constants/date';
import store from '../store/store';
import {
	getFirstDayFromYearMonth,
	getDateCountFromYearMonth,
	isToday,
} from '../utils/date';
import { getGroupedHistoryByDay, getMonthTotalMoney } from '../utils/history';
import { getEmptyArray } from '../utils/array';

class Calendar {
	constructor() {
		this.DOMElement = document.createElement('div');
		this.DOMElement.className = 'calendar';
		store.subscribe('history', this.render.bind(this));
		store.subscribe('year', this.render.bind(this));
		store.subscribe('month', this.render.bind(this));

		this.render();
	}

	makeHistoryByNowHistory(nowHistory) {
		const { incomeSum, expenseSum } = nowHistory;
		const priceSum = incomeSum - expenseSum;

		return `
			${incomeSum ? `<div class="income">+${incomeSum.toLocaleString()}</div>` : ''}
			${
				expenseSum
					? `<div class="expense">-${expenseSum.toLocaleString()}</div>`
					: ''
			}
				<div class="sum">${priceSum.toLocaleString()}</div>
			`;
	}

	getTableBodyData({
		dateCount,
		groupedHistory,
		firstDay,
		rowIndex,
		columnIndex,
	}) {
		const year = store.getState('year');
		const month = store.getState('month');
		const nowDate = rowIndex * MAX_WEEK + columnIndex + 1 - firstDay;
		const isNowDateInCurrentMonth = nowDate > 0 && nowDate <= dateCount;
		if (!isNowDateInCurrentMonth) return '<td></td>';

		const nowHistory = groupedHistory[nowDate];

		return ` 
			<td class="bold-medium ${isToday(year, month, nowDate) ? ' now' : ''}">
				${nowHistory ? this.makeHistoryByNowHistory(nowHistory) : ''}
				<div class="bold-small date body-small">${nowDate}</div>
			</td>
		`;
	}

	getTableBodyRowCells({ rowIndex, firstDay, dateCount, groupedHistory }) {
		return getEmptyArray(MAX_WEEK)
			.map((_, columnIndex) =>
				this.getTableBodyData({
					dateCount,
					groupedHistory,
					firstDay,
					rowIndex,
					columnIndex,
				})
			)
			.join('');
	}

	getTableBodyRows(groupedHistory) {
		const year = store.getState('year');
		const month = store.getState('month');
		const firstDay = getFirstDayFromYearMonth(year, month);
		const dateCount = getDateCountFromYearMonth(year, month);
		const rowCount = Math.ceil((firstDay + dateCount) / MAX_WEEK);

		return getEmptyArray(rowCount)
			.map(
				(_, rowIndex) => `
					<tr>
						${this.getTableBodyRowCells({ rowIndex, firstDay, dateCount, groupedHistory })}
					</tr>
				`
			)
			.join('');
	}

	template() {
		const history = store.getState('history');
		const groupedHistory = getGroupedHistoryByDay(history);
		const totalMoney = getMonthTotalMoney(groupedHistory);

		return `
			<table>
				<thead class="calendar__header body-regular">
					<tr>
						<th>일</th>
						<th>월</th>
						<th>화</th>
						<th>수</th>
						<th>목</th>
						<th>금</th>
						<th>토</th>
					</tr>
				</thead>
				<tbody class="calendar__body">
					${this.getTableBodyRows(groupedHistory)}
				</tbody>
			</table>
			<div class="calendar__footer">
				<div>
					<span>총 수입: ${totalMoney.income.toLocaleString()}</span>
					<span>총 지출: ${totalMoney.expense.toLocaleString()}</span>
				</div>
				<span>총계: ${totalMoney.sum.toLocaleString()}</span>
			</div>
    `;
	}

	render() {
		this.DOMElement.innerHTML = this.template();
	}
}

export default Calendar;
