import store from '../store/store';
import {
	getFirstDayFromYearMonth,
	getLastDateFromYearMonth as getDateCountFromYearMonth,
} from '../utils/date';

class Calendar {
	constructor() {
		this.DOMElement = document.createElement('div');
		this.DOMElement.className = 'calendar';
		store.subscribe('history', this.render.bind(this));
		store.subscribe('year', this.render.bind(this));
		store.subscribe('month', this.render.bind(this));

		this.render();
	}

	template() {
		const year = store.getState('year');
		const month = store.getState('month');
		const firstDay = getFirstDayFromYearMonth(year, month);
		const dateCount = getDateCountFromYearMonth(year, month);
		const rowCount = Math.ceil((firstDay + dateCount) / 7);

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
					${Array(rowCount)
						.fill()
						.map(
							(_, weekIndex) =>
								`<tr>
									${Array(7)
										.fill()
										.map((_, i) => {
											const nowDate = weekIndex * 7 + i + 1 - firstDay;
											const isNowDateValid =
												nowDate > 0 && nowDate <= dateCount;

											return ` 
													<td>
														<div class="expense">-4,000</div>
														<div class="income">+16,000</div>
														<div>+12,000</div>
														<div class="date body-small">${isNowDateValid ? nowDate : ''}</div>
													</td>
												`;
										})
										.join('')}
									</tr>`
						)
						.join('')}
				</tbody>
			</table>
			<div class="calendar__footer">
				<div>
					<span class="total-income">총 수입: 1,822,480</span>
					<span class="total-expense">총 지출: 834,640</span>
				</div>
				<span class="total_sum">총계: 834,640</span>
			</div>
    `;
	}

	render() {
		this.DOMElement.innerHTML = this.template();
	}
}

export default Calendar;
