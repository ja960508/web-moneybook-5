import category from '../constants/category';
import store from '../store/store';

class HistoryList {
	constructor(props) {
		this.props = props;
		this.DOMElement = document.createElement('ol');
		store.subscribe('month', this.render.bind(this));
		this.render();
	}

	getSortedDayList(groupedHistory) {
		return Object.keys(groupedHistory).sort((a, b) => b - a);
	}

	getDailyTotalMoney(filteredHistory, day) {
		return `
					${
						filteredHistory[day].incomeSum && !this.props.isIncomeFiltered
							? `수입 ${filteredHistory[day].incomeSum.toLocaleString()}`
							: ''
					}
					${
						filteredHistory[day].expenseSum && !this.props.isExpenseFiltered
							? `지출 ${filteredHistory[day].expenseSum.toLocaleString()}`
							: ''
					}
				`;
	}

	makeHistoryItems(item) {
		return `<li class="history__item bold-medium">
		<div>
			<span class="category ${category[item.category]} bold-small">${
			item.category
		}</span>
			<span>${item.content}</span>
		</div>
		<div>
			${item.paymentMethod}
		</div>
		<div>
			${item.isIncome ? '' : '-'}${item.price.toLocaleString()}원
		</div>
	</li>`;
	}

	template() {
		const month = store.getState('month');
		const { filteredHistory } = this.props;

		return `
    ${this.getSortedDayList(filteredHistory)
			.map(
				(day) => `<li class="history__day bold-medium">
        <div class="history__day-meta">
          <div>${month}월 ${day}일</div>
          <div class="history__day-total">
            ${
							this.props.hideTotal
								? ''
								: this.getDailyTotalMoney(filteredHistory, day)
						}
          </div>
        </div>
        <ul>
          ${filteredHistory[day].history
						.map((item) => this.makeHistoryItems(item))
						.join('')}
        </ul>
      </li>`
			)
			.join('')}
  `;
	}

	render() {
		this.DOMElement.innerHTML = this.template();
	}
}

export default HistoryList;
