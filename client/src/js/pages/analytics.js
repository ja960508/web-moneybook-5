import Donut from '../components/Donut';

export default function renderAnalytics(main) {
	const donut = new Donut();

	main.DOMElement.appendChild(donut.DOMElement);
	main.setChildren(donut);
}
