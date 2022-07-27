import Calendar from '../components/Calender';

export default function renderCalendar(container) {
	container.appendChild(new Calendar().DOMElement);
}
