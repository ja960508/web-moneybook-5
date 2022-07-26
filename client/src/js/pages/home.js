import Header from '../components/Header';
import HistoryForm from '../components/HistoryForm';
import HistoryContainer from '../components/HistoryContainer';

export default function renderHome() {
	const app = document.querySelector('#app');
	app.appendChild(new Header().DOMElement);
	app.appendChild(new HistoryForm().DOMElement);
	app.appendChild(new HistoryContainer().DOMElement);
}
