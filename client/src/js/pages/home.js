import HistoryForm from '../components/HistoryForm';
import HistoryContainer from '../components/HistoryContainer';

export default function renderHome(container) {
	container.appendChild(new HistoryForm().DOMElement);
	container.appendChild(new HistoryContainer().DOMElement);
}
