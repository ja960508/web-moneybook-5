import CustomLink from './custom_elements/CustomLink.js';
import '@styles/reset.css';
import '@styles/common.scss';
import '@styles/HistoryContainer.css';
import '@styles/Header.css';
import '@styles/HistoryForm.css';
import '@styles/Calendar.css';
import '@styles/PaymentMethodModal.css';
import '@styles/Donut.css';
import '@styles/LineChart.css';
import createRouter, { changeActiveNavElement } from './core/router.js';
import Header from './components/Header.js';
import store from './store/store.js';
import action from './store/action.js';
import { getAllPaymentMethod } from './api/payment_method.js';
import { getAllCategory } from './api/category';
import { getCurrentHistory } from './api/history';
import Main from './components/Main.js';
import renderAnalytics from './pages/analytics';
import renderCalendar from './pages/calendar';
import renderHome from './pages/home';

function setRouter(container) {
	customElements.define('custom-link', CustomLink, { extends: 'a' });
	const routes = {
		'/': renderHome,
		'/calendar': renderCalendar,
		'/analytics': renderAnalytics,
	};
	const router = createRouter(routes, container);

	window.addEventListener('popstate', () => {
		router.render(window.location.pathname);
		changeActiveNavElement();
	});

	router.render(window.location.pathname);

	return router;
}

async function initStore() {
	const currentDate = store.getState('date');
	const history = await getCurrentHistory(currentDate.year, currentDate.month);
	const category = await getAllCategory();
	const paymentMethod = await getAllPaymentMethod();

	store.dispatch(action.getCurrentMonthData(history));
	store.dispatch(action.getAllCategory(category));
	store.dispatch(action.getAllPaymentMethod(paymentMethod));
}

function init() {
	const app = document.getElementById('app');
	const main = new Main();
	const router = setRouter(main);
	initStore();

	app.appendChild(main.DOMElement);
	app.insertBefore(new Header().DOMElement, app.firstChild);

	return router;
}

export const router = init();
