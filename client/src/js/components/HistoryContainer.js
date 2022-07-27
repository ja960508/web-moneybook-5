import icons from '../constants/icons';
import store from '../store/store';
import {
	getFilteredHistory,
	getGroupedHistoryByDay,
	getMonthTotalMoney,
} from '../utils/history';
import HistoryList from './HistoryList';

class HistoryContainer {
	constructor(props = {}) {
		this.DOMElement = document.createElement('main');
		this.props = props;
		this.state = {
			isIncomeFiltered: false,
			isExpenseFiltered: false,
		};
		store.subscribe('history', this.render.bind(this));

		this.render();
		this.setEvent();
	}

	getTotalLength(filteredHistory) {
		return Object.values(filteredHistory).reduce(
			(length, curr) => length + curr.history.length,
			0
		);
	}

	template({ filteredHistory, totalMoney }) {
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
		`;
	}

	render() {
		const history = store.getState('history');
		const groupedHistory = getGroupedHistoryByDay(history);
		const filteredHistory = getFilteredHistory(
			groupedHistory,
			(item) =>
				(item.isIncome && !this.state.isIncomeFiltered) ||
				(!item.isIncome && !this.state.isExpenseFiltered)
		);
		const totalMoney = getMonthTotalMoney(groupedHistory);
		debugger;

		this.DOMElement.innerHTML = this.template({ filteredHistory, totalMoney });
		this.DOMElement.appendChild(
			new HistoryList({ filteredHistory, ...this.state }).DOMElement
		);
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
