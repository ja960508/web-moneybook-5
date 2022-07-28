import CustomLink from './custom_elements/CustomLink.js';
import '@styles/reset.css';
import '@styles/common.scss';
import '@styles/HistoryContainer.css';
import '@styles/Header.css';
import '@styles/HistoryForm.css';
import '@styles/Calendar.css';
import '@styles/Modal.css';
import '@styles/Donut.css';
import '@styles/LineChart.css';
import '@styles/Analytics.css';
import '@styles/Loading.css';
import createRouter, {
	changeActiveNavElement,
	getYearAndMonthFromURLParams,
} from './core/router.js';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Loading from './components/commons/Loading.js';
import store from './store/store.js';
import action from './store/action.js';
import { getAllPaymentMethod } from './api/payment_method.js';
import { getAllCategory } from './api/category';
import { getCurrentHistory } from './api/history';
import renderAnalytics from './pages/analytics';
import renderCalendar from './pages/calendar';
import renderHome from './pages/home';
import setLoadingInRequest from './utils/request_loader.js';

function isStoreDateSameWithURL() {
	const { year: yearFromURL, month: monthFromURL } =
		getYearAndMonthFromURLParams();
	const { year, month } = store.getState('date');

	return year === yearFromURL && month === monthFromURL;
}

async function setNewHistory() {
	const { year: yearFromURL, month: monthFromURL } =
		getYearAndMonthFromURLParams();
	const history = await setLoadingInRequest(async () => {
		return await getCurrentHistory(yearFromURL, monthFromURL);
	});
	store.dispatch(action.getCurrentMonthData(history));
}

function setRouter(container) {
	customElements.define('custom-link', CustomLink, { extends: 'a' });
	const routes = {
		'/': renderHome,
		'/calendar': renderCalendar,
		'/analytics': renderAnalytics,
	};
	const router = createRouter(routes, container);

	window.addEventListener('popstate', async () => {
		if (!isStoreDateSameWithURL()) {
			await setNewHistory();
		}
		router.render(window.location.pathname);
		changeActiveNavElement();
	});

	router.render(window.location.pathname);

	return router;
}

async function initStore() {
	const currentDate = store.getState('date');

	await setLoadingInRequest(async () => {
		const history = await getCurrentHistory(
			currentDate.year,
			currentDate.month
		);
		const category = await getAllCategory();
		const paymentMethod = await getAllPaymentMethod();
		store.dispatch(action.getCurrentMonthData(history));
		store.dispatch(action.getAllCategory(category));
		store.dispatch(action.getAllPaymentMethod(paymentMethod));
	});
}

function init() {
	const app = document.getElementById('app');
	const main = new Main();
	const loading = new Loading();
	const router = setRouter(main);

	app.appendChild(main.DOMElement);
	app.appendChild(loading.DOMElement);
	app.insertBefore(new Header().DOMElement, app.firstChild);

	initStore();

	return router;
}

export const router = init();
