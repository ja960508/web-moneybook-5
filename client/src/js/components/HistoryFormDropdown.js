import Component from '../core/Component';

class HistoryFormDropdown extends Component {
	constructor(container, props) {
		super();
		this.DOMElement = document.createElement('ul');
		this.DOMElement.className = 'history__form-dropdown';
		this.props = props;
		if (props.isPaymentMethod) {
			this.subscribe('paymentMethod', this.render.bind(this));
		} else {
			this.subscribe('category', this.render.bind(this));
		}
		container.appendChild(this.DOMElement);
		this.render();
		this.setEvent();
	}

	template() {
		const { isPaymentMethod } = this.props;
		const state = isPaymentMethod ? 'paymentMethod' : 'category';
		const dropdownContent = this.getState(state);

		return `
			${dropdownContent
				.map(
					(item) => `<li data-id=${item.id} ${
						isPaymentMethod ? '' : `data-is-income=${item.isIncome}`
					}>
				<span>${item.name}</span>
				${
					isPaymentMethod
						? `<button class="payment-method-delete" type="button"></button>`
						: ''
				}
			</li>`
				)
				.join('')}
			${isPaymentMethod ? `<li class="payment-method-add">추가하기</li>` : ''}
		`;
	}

	render() {
		this.DOMElement.innerHTML = this.template();
	}

	setEvent() {
		this.DOMElement.addEventListener('click', (event) => {
			this.props.onClick(event);
			if (
				!event.target.closest('.payment-method-add') &&
				!event.target.closest('.payment-method-delete')
			) {
				this.props.onClear();
			}
		});
	}
}

export default HistoryFormDropdown;
