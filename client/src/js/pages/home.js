import Header from '../components/Header.js';

export default function renderHome() {
	const app = document.getElementById('app');
	app.append(new Header().DOMElement);
}
