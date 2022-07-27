import Analytics from '../components/Analytics';

export default function renderAnalytics(main) {
	const analytics = new Analytics();

	main.DOMElement.appendChild(analytics.DOMElement);
	main.setChild(analytics);
}
