import CustomLink from './custom_elements/CustomLink.js';
import '../styles/common.css';
import renderHome from './pages/home.js';

customElements.define('custom-link', CustomLink, { extends: 'a' });

renderHome();
