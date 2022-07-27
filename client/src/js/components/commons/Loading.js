import Component from '../../core/Component';

class Loading extends Component {
	constructor() {
		super();
		this.DOMElement = document.createElement('div');
		this.DOMElement.className = `loading-overlay`;

		this.render();
	}

	template() {
		return `
    <div class="spinner">
    </div>`;
	}

	render() {
		this.DOMElement.innerHTML = this.template();
	}
}

export default Loading;
