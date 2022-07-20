import CustomLink from './custom_elements/CustomLink.js';
import '../styles/reset.css';
import '../styles/common.css';
import renderHome from './pages/home.js';
import Router from './core/router.js';

(function () {
	customElements.define('custom-link', CustomLink, { extends: 'a' });

	window.addEventListener('popstate', () => {
		Router.render(window.location.pathname);
	});

	renderHome();
})();
