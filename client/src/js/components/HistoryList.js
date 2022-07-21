import icons from '../constants/icons';
import store from '../store/store';

class HistoryList {
	constructor(props = {}) {
		this.DOMElement = document.createElement('main');
		this.props = props;
		store.subscribe('history', this.render.bind(this));
		store.subscribe('month', this.render.bind(this));

		this.render();
	}

	getTotal(groupedHistory, day) {
		return `
					${
						groupedHistory[day].incomeSum
							? `수입 ${groupedHistory[day].incomeSum.toLocaleString()}`
							: ''
					}
					${
						groupedHistory[day].expenseSum
							? `지출 ${groupedHistory[day].expenseSum.toLocaleString()}`
							: ''
					}
				`;
	}

	getGroupedHistoryByDay(history) {
		const result = {};

		history.forEach((item) => {
			if (!result[item.day]) {
				result[item.day] = { history: [], incomeSum: 0, expenseSum: 0 };
			}

			result[item.day].history.push(item);
			if (item.isIncome) {
				result[item.day].incomeSum += item.price;
			} else {
				result[item.day].expenseSum += item.price;
			}
		});

		return result;
	}

	getSortedDayList(groupedHistory) {
		return Object.keys(groupedHistory).sort((a, b) => b - a);
	}

	template() {
		const history = store.getState('history');
		const month = store.getState('month');
		const groupedHistory = this.getGroupedHistoryByDay(history);

		return `<div class="list-meta">
    <span>전체 내역 ${history.length}건</span>
    <div class="list-meta__button-container">
      <button class="list-meta__income-button">
        <div>${icons.check}</div>
        <span>수입</span>
      </button>
      <button class="list-meta__expense-button">
        <div>${icons.check}</div>
        <span>수입</span>
      </button>
    </div>
    </div>
    <ul>
      ${this.getSortedDayList(groupedHistory)
				.map(
					(day) => `<li class="history__day bold-medium">
          <div class="history__day-meta">
            <div>${month}월 ${day}일</div>
						<div class="history__day-total">
							${this.props.hideTotal ? '' : this.getTotal(groupedHistory, day)}
						</div>
          </div>
        </li>`
				)
				.join('')}
    </ul>`;
	}

	render() {
		this.DOMElement.innerHTML = this.template();
	}
}

export default HistoryList;
