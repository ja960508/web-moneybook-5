import category from '../constants/category';
import Component from '../core/Component';

class HistoryList extends Component {
	constructor(props) {
		super();
		this.props = props;
		this.DOMElement = document.createElement('ol');
		this.DOMElement.className = 'history-list';
		this.subscribe('date', this.render.bind(this));
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
		return `<li class="history__item bold-medium" data-id="${item.id}">
		<div class="history__item-inside">
			<div>
				<span class="category ${category[item.category]} bold-small">${
			item.category
		}</span>
				<span class="history__item-content">${item.content}</span>
			</div>
			<div>
				${item.paymentMethod}
			</div>
			<div>
				${item.isIncome ? '' : '-'}${item.price.toLocaleString()}원
			</div>
		</div>
		<button class="delete-button">X</button>
	</li>`;
	}

	template() {
		const { month } = this.getState('date');
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
