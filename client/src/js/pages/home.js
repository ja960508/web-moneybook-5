import Header from '../components/Header';

export default function renderHome() {
	const app = document.querySelector('#app');
	app.appendChild(new Header().DOMElement);
}
