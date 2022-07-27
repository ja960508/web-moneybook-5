import HistoryForm from '../components/HistoryForm';
import HistoryContainer from '../components/HistoryContainer';

export default function renderHome(main) {
	const historyForm = new HistoryForm();
	const historyContainer = new HistoryContainer();

	main.DOMElement.appendChild(historyForm.DOMElement);
	main.DOMElement.appendChild(historyContainer.DOMElement);

	main.setChild(historyForm);
	main.setChild(historyContainer);
}
