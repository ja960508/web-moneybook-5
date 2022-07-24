import Header from '../components/Header';
import HistoryForm from '../components/HistoryForm';
import HistoryList from '../components/HistoryList';

export default function renderHome() {
	const app = document.querySelector('#app');
	app.appendChild(new Header().DOMElement);
	app.appendChild(new HistoryForm().DOMElement);
	app.appendChild(new HistoryList().DOMElement);
}
