import icons from '../constants/icons';
import Component from '../core/Component';
import action from '../store/action';
import store from '../store/store';
import {
	getFilteredHistory,
	getGroupedHistoryByDay,
	getMonthTotalMoney,
} from '../utils/history';
import HistoryList from './HistoryList';

class HistoryContainer extends Component {
	constructor(props = {}) {
		super();
		this.DOMElement = document.createElement('div');
		this.DOMElement.className = 'history-container';
		this.props = props;
		this.state = {
			isIncomeFiltered: false,
			isExpenseFiltered: false,
		};
		this.subscribe('history', this.render.bind(this));
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
      <button class="list-meta__income-button" data-checked=${!this.keys
				.isIncomeFiltered}>
        <div>${icons.check}</div>
        <span>수입 ${totalMoney.income.toLocaleString()}</span>
      </button>
      <button class="list-meta__expense-button" data-checked=${!this.keys
				.isExpenseFiltered}>
        <div>${icons.check}</div>
        <span>지출 ${totalMoney.expense.toLocaleString()}</span>
      </button>
    </div>
    </div>
		`;
	}

	render() {
		const history = this.getState('history');
		const groupedHistory = getGroupedHistoryByDay(history);
		const filteredHistory = getFilteredHistory(
			groupedHistory,
			(item) =>
				(item.isIncome && !this.keys.isIncomeFiltered) ||
				(!item.isIncome && !this.keys.isExpenseFiltered)
		);
		const totalMoney = getMonthTotalMoney(groupedHistory);
		const historyList = new HistoryList({ filteredHistory, ...this.keys });
		this.DOMElement.innerHTML = this.template({ filteredHistory, totalMoney });
		this.DOMElement.appendChild(historyList.DOMElement);
		this.setChild(historyList);
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
			const historyItem = event.target.closest('.history__item');

			if (incomeFilterButton) {
				this.toggleChecked(incomeFilterButton);
				this.keys.isIncomeFiltered = !this.keys.isIncomeFiltered;
				this.render();
			} else if (expenseFilterButton) {
				this.toggleChecked(expenseFilterButton);
				this.keys.isExpenseFiltered = !this.keys.isExpenseFiltered;
				this.render();
			} else if (historyItem) {
				const history = this.getState('history');
				const item = history.find(({ id }) => id == historyItem.dataset.id);
				this.DOMElement.querySelectorAll('.history__item').forEach((item) => {
					item.classList.remove('updating');
				});
				historyItem.classList.add('updating');

				store.dispatch(
					action.updateHistoryFormData({
						...item,
						date: getDateForCalender(item.date),
						price: item.price.toLocaleString(),
						isUpdateMode: true,
					})
				);
			}
		});
	}
}

function addLeadingZero(number) {
	return `${number}`.padStart(2, '0');
}

/**
 * "2022-07-27T15:00:00.000Z"와 같은 날짜를 "2022-07-28"로 바꿔서 반환한다.
 *
 * @param {string} date
 */
function getDateForCalender(dateString) {
	const date = new Date(dateString);
	return `${date.getFullYear()}-${addLeadingZero(
		date.getMonth() + 1
	)}-${addLeadingZero(date.getDate())}`;
}

export default HistoryContainer;
