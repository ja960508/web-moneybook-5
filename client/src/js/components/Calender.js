import store from '../store/store';

class Calendar {
	constructor() {
		this.DOMElement = document.createElement('div');
		this.DOMElement.className = 'calendar';
		store.subscribe('history', this.render.bind(this));

		this.render();
	}

	template() {
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
					${Array(5)
						.fill()
						.map(
							() =>
								`<tr>
									${Array(7)
										.fill()
										.map(
											(_, i) => `
											<td>
												<div class="expense">-4,000</div>
												<div class="income">+16,000</div>
												<div>+12,000</div>
												<div class="date body-small">${i + 1}</div>
											</td>
									`
										)
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
