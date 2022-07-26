import category from '../constants/category';
import icons from '../constants/icons';
import store from '../store/store';
import { getGroupedHistoryByDay, getMonthTotalMoney } from '../utils/history';

class HistoryContainer {
	constructor(props = {}) {
		this.DOMElement = document.createElement('main');
		this.props = props;
		this.state = {
			isIncomeFiltered: false,
			isExpenseFiltered: false,
		};
		store.subscribe('history', this.render.bind(this));
		store.subscribe('month', this.render.bind(this));

		this.render();
		this.setEvent();
	}

	getDailyTotalMoney(filteredHistory, day) {
		return `
					${
						filteredHistory[day].incomeSum && !this.state.isIncomeFiltered
							? `수입 ${filteredHistory[day].incomeSum.toLocaleString()}`
							: ''
					}
					${
						filteredHistory[day].expenseSum && !this.state.isExpenseFiltered
							? `지출 ${filteredHistory[day].expenseSum.toLocaleString()}`
							: ''
					}
				`;
	}

	getSortedDayList(groupedHistory) {
		return Object.keys(groupedHistory).sort((a, b) => b - a);
	}

	getFilteredHistory(groupedHistory) {
		const filteredHistory = { ...groupedHistory };

		for (const day in groupedHistory) {
			filteredHistory[day].history = groupedHistory[day].history.filter(
				(item) =>
					(item.isIncome && !this.state.isIncomeFiltered) ||
					(!item.isIncome && !this.state.isExpenseFiltered)
			);

			if (!filteredHistory[day].history.length) {
				delete filteredHistory[day];
			}
		}

		return filteredHistory;
	}

	getTotalLength(filteredHistory) {
		return Object.values(filteredHistory).reduce(
			(length, curr) => length + curr.history.length,
			0
		);
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
		const history = store.getState('history');
		const month = store.getState('month');
		const groupedHistory = getGroupedHistoryByDay(history);
		const filteredHistory = this.getFilteredHistory(groupedHistory, this.state);
		const totalMoney = getMonthTotalMoney(groupedHistory);

		return `<div class="list-meta">
    <span>전체 내역 ${this.getTotalLength(filteredHistory)}건</span>
    <div class="list-meta__button-container">
      <button class="list-meta__income-button" data-checked=${!this.state
				.isIncomeFiltered}>
        <div>${icons.check}</div>
        <span>수입 ${totalMoney.income.toLocaleString()}</span>
      </button>
      <button class="list-meta__expense-button" data-checked=${!this.state
				.isExpenseFiltered}>
        <div>${icons.check}</div>
        <span>지출 ${totalMoney.expense.toLocaleString()}</span>
      </button>
    </div>
    </div>
    <ol>
      ${this.getSortedDayList(filteredHistory)
				.map(
					(day) => `<li class="history__day bold-medium">
          <div class="history__day-meta">
            <div>${month}월 ${day}일</div>
						<div class="history__day-total">
							${this.props.hideTotal ? '' : this.getDailyTotalMoney(filteredHistory, day)}
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
    </ol>`;
	}

	render() {
		this.DOMElement.innerHTML = this.template();
	}

	toggleChecked(filterButton) {
		filterButton.dataset.checked = filterButton.dataset.checked ? '' : 'true';
	}

	setEvent() {
		this.DOMElement.addEventListener('click', (event) => {
			const incomeFilterButton = event.target.closest(
				'.list-meta__income-button'
			);
			const expenseFilterButton = event.target.closest(
				'.list-meta__expense-button'
			);

			if (incomeFilterButton) {
				this.toggleChecked(incomeFilterButton);
				this.state.isIncomeFiltered = !this.state.isIncomeFiltered;
				this.render();
			} else if (expenseFilterButton) {
				this.toggleChecked(expenseFilterButton);
				this.state.isExpenseFiltered = !this.state.isExpenseFiltered;
				this.render();
			}
		});
	}
}

export default HistoryContainer;
