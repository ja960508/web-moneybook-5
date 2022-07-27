import Component from '../../core/Component';

class Loading extends Component {
	constructor() {
		super();
		this.DOMElement = document.createElement('div');
		this.DOMElement.className = `loading-overlay`;
		this.subscribe('loading', this.changeLoadingState.bind(this));

		this.render();
	}

	changeLoadingState() {
		this.DOMElement.classList.toggle('loading');
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
