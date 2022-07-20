import { getCurrentHistory } from '../api/request';
import icons from '../constants/icons';
import action from '../store/action';
import store from '../store/store';
import { getNextYearAndMonth, getPrevYearAndMonth } from '../utils/date';

class Header {
	constructor() {
		this.DOMElement = document.createElement('header');
		this.DOMElement.classList.add('header');
		store.subscribe('month', this.render.bind(this));
		this.render();
		this.setEvent();
	}

	setActive() {
		const customLinks = this.DOMElement.querySelectorAll(
			'nav [is=custom-link]'
		);
		const path = window.location.pathname;
		customLinks.forEach((link) => {
			link.getAttribute('href') === path && link.classList.add('active');
		});
	}

	template() {
		const year = store.getState('year');
		const month = store.getState('month');

		return `
      <div class="wrapper"> 
        <a class="logo" is="custom-link" href="/"><h1 class="display-small">우아한 가계부</h1></a>
        <div class="month-controller">
          <button type="button" class="month-controller__prev-button">${icons.arrow}</button>
          <div>
            <div class="display-large">${month}</div>
            <div class="display-small">${year}</div>
          </div> 
          <button type="button" class="month-controller__next-button">${icons.arrow}</button>
        </div>
        <nav>
          <a class="moneybook" is="custom-link" href="/">
          ${icons.document}
          </a> 
          <a class="calendar" is="custom-link" href="/calendar">
            ${icons.calendar}
          </a>
          <a class="analytics" is="custom-link" href="/analytics">
          ${icons.chart}</a>
        </nav>
      </div>
    `;
	}

	render() {
		this.DOMElement.innerHTML = this.template();
		this.setActive();
	}

	setEvent() {
		this.DOMElement.addEventListener('click', async (event) => {
			const year = Number(store.getState('year'));
			const month = Number(store.getState('month'));

			if (event.target.closest('.month-controller__prev-button')) {
				const [prevYear, prevMonth] = getPrevYearAndMonth(year, month);
				const response = await getCurrentHistory(prevYear, prevMonth);

				store.dispatch(action.getCurrentMonthData(response));
			} else if (event.target.closest('.month-controller__next-button')) {
				const [nextYear, nextMonth] = getNextYearAndMonth(year, month);
				const response = await getCurrentHistory(nextYear, nextMonth);

				store.dispatch(action.getCurrentMonthData(response));
			}
		});
	}
}

export default Header;

// store에서 데이터를 다 가지고 있음
// app에서 store 구독 중임
// app에서 자식 컴포넌트(Hedaer,,) 렌더 호출할 때 데이터를 전달해야함
