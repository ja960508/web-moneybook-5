import store from '../store/store';
import {
	getFirstDayFromYearMonth,
	getDateCountFromYearMonth,
	isNowDate,
} from '../utils/date';
import { getGroupedHistoryByDay, getMonthTotalMoney } from '../utils/history';

class Calendar {
	constructor() {
		this.DOMElement = document.createElement('div');
		this.DOMElement.className = 'calendar';
		store.subscribe('history', this.render.bind(this));
		store.subscribe('year', this.render.bind(this));
		store.subscribe('month', this.render.bind(this));

		this.render();
	}

	getTableBodyData({
		dateCount,
		groupedHistory,
		firstDay,
		weekIndex,
		columnIndex,
	}) {
		const year = store.getState('year');
		const month = store.getState('month');
		const nowDate = weekIndex * 7 + columnIndex + 1 - firstDay;
		const isNowDateValid = nowDate > 0 && nowDate <= dateCount;
		if (!isNowDateValid) return '<td></td>';

		const nowHistory = groupedHistory[nowDate];
		const priceSum = nowHistory
			? nowHistory.incomeSum - nowHistory.expenseSum
			: undefined;

		return ` 
			<td class="bold-medium ${isNowDate(year, month, nowDate) ? ' now' : ''}">
				${
					nowHistory?.incomeSum
						? `<div class="income">+${nowHistory.incomeSum.toLocaleString()}</div>`
						: ''
				}
				${
					nowHistory?.expenseSum
						? `<div class="expense">-${nowHistory.expenseSum.toLocaleString()}</div>`
						: ''
				}
				${
					priceSum !== undefined
						? `<div class="sum">${priceSum.toLocaleString()}</div>`
						: ''
				}
				<div class="bold-small date body-small">${nowDate}</div>
			</td>
		`;
	}

	getTableBodyRows(groupedHistory) {
		const year = store.getState('year');
		const month = store.getState('month');
		const firstDay = getFirstDayFromYearMonth(year, month);
		const dateCount = getDateCountFromYearMonth(year, month);
		const rowCount = Math.ceil((firstDay + dateCount) / 7);

		return `
			${Array(rowCount)
				.fill()
				.map(
					(_, weekIndex) =>
						`<tr>
							${Array(7)
								.fill()
								.map((_, columnIndex) =>
									this.getTableBodyData({
										dateCount,
										groupedHistory,
										firstDay,
										weekIndex,
										columnIndex,
									})
								)
								.join('')}
							</tr>`
				)
				.join('')}
			`;
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
