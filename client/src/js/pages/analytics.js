import Donut from '../components/Donut';
import Header from '../components/Header';

export default function renderAnalytics() {
	const app = document.querySelector('#app');
	app.appendChild(new Header().DOMElement);
	app.appendChild(new Donut().DOMElement);
}
