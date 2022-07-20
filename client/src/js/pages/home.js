import Header from '../components/Header';
import HistoryList from '../components/HistoryList';

export default function renderHome() {
	const app = document.querySelector('#app');
	app.appendChild(new Header().DOMElement);
	app.appendChild(new HistoryList().DOMElement);
}
