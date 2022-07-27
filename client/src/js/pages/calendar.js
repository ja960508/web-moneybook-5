import Calendar from '../components/Calender';

export default function renderCalendar(main) {
	const calendar = new Calendar();

	main.DOMElement.appendChild(calendar.DOMElement);
	main.setChildren(calendar);
}
