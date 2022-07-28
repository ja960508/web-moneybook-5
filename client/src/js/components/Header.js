import { getCurrentHistory } from '../api/history';
import icons from '../constants/icons';
import { changeActiveNavElement } from '../core/router';
import action from '../store/action';
import store from '../store/store';
import Component from '../core/Component';
import { getNextYearAndMonth, getPrevYearAndMonth } from '../utils/date';
import setLoadingInRequest from '../utils/request_loader';

class Header extends Component {
	constructor() {
		super();
		this.DOMElement = document.createElement('header');
		this.DOMElement.classList.add('header');
		this.subscribe('date', this.render.bind(this));
		this.render();
		this.setEvent();
	}

	template() {
		const date = this.getState('date');
		const { year, month } = date;
		const [prevYear, prevMonth] = getPrevYearAndMonth(year, month);
		const [nextYear, nextMonth] = getNextYearAndMonth(year, month);

		return `
      <div class="wrapper"> 
        <a class="logo" is="custom-link" href="/"><h1 class="display-small">우아한 가계부</h1></a>
        <div class="month-controller">
          <a is="custom-link" href="${`?year=${prevYear}&month=${prevMonth}`}"  class="month-controller__prev-button">${
			icons.arrow
		}</a>
          <div>
            <div class="display-large">${month}</div>
            <div class="display-small">${year}</div>
          </div> 
          <a is="custom-link" href="${`?year=${nextYear}&month=${nextMonth}`}" class="month-controller__next-button">${
			icons.arrow
		}</a>
        </div>
        <nav>
          <a class="moneybook-link" is="custom-link" href="/">
          ${icons.document}
          </a> 
          <a class="calendar-link" is="custom-link" href="/calendar">
            ${icons.calendar}
          </a>
          <a class="analytics-link" is="custom-link" href="/analytics">
          ${icons.chart}</a>
        </nav>
      </div>
    `;
	}

	render() {
		this.DOMElement.innerHTML = this.template();
		changeActiveNavElement(this.DOMElement);
	}

	setEvent() {
		this.DOMElement.addEventListener('click', async (event) => {
			if (
				event.target.closest('.month-controller__prev-button') ||
				event.target.closest('.month-controller__next-button')
			) {
				store.dispatch(action.getCurrentMonthData({ history: [] }));
				const { year, month } = this.getState('date');
				const response = await setLoadingInRequest(async () => {
					return await getCurrentHistory(year, month);
				});
				store.dispatch(action.getCurrentMonthData(response));
				store.dispatch(action.changeDate({ year, month }));
			} else if (event.target.closest('nav [is=custom-link]')) {
				changeActiveNavElement();
			}
		});
	}
}

export default Header;
