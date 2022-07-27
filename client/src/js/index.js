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
import Router from './core/router.js';
import store from './store/store.js';
import action from './store/action.js';
import { getAllPaymentMethod } from './api/payment_method.js';
import { getAllCategory } from './api/category';
import { getCurrentHistory } from './api/history';

(async function () {
	customElements.define('custom-link', CustomLink, { extends: 'a' });
	const currentDate = store.getState('date');
	const path = window.location.pathname;

	const history = await getCurrentHistory(currentDate.year, currentDate.month);
	const category = await getAllCategory();
	const paymentMethod = await getAllPaymentMethod();
	store.dispatch(action.getCurrentMonthData(history));
	store.dispatch(action.getAllCategory(category));
	store.dispatch(action.getAllPaymentMethod(paymentMethod));

	window.addEventListener('popstate', () => {
		const path = window.location.pathname;
		Router.render(path);

		const customLinks = document.querySelectorAll('nav [is=custom-link]');

		customLinks.forEach((link) => {
			link.classList.remove('active');
			link.getAttribute('href') === path && link.classList.add('active');
		});
	});

	Router.render(path);
})();
