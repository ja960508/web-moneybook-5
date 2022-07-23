import Calendar from '../components/Calender';
import Header from '../components/Header';

export default function renderCalendar() {
	const app = document.querySelector('#app');
	app.appendChild(new Header().DOMElement);
	app.appendChild(new Calendar().DOMElement);
}
