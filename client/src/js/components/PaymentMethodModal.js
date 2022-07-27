import { addPaymentMethod, deletePaymentMethod } from '../api/payment_method';
import paymentMethodType from '../constants/payment_method';
import action from '../store/action';
import store from '../store/store.js';
import setLoadingInRequest from '../utils/request_loader';

class PaymentMethodModal {
	constructor(props) {
		this.DOMElement = document.createElement('div');
		this.DOMElement.className = 'modal-overlay';
		this.props = props;
		this.isDelete = Boolean(
			this.props.paymentMethodType === paymentMethodType.remove
		);

		document.body.appendChild(this.DOMElement);
		this.render();
	}

	template() {
		return `
			<form class="modal">
				<p class="body-medium">
					${this.props.title}
				</p>
				<input id="paymentMethod" type="text" class="modal-input body-medium" value="${
					this.props.paymentMethod.content
				}" placeholder="입력하세요" ${
			this.isDelete ? 'readOnly' : ''
		} maxlength=10 autocomplete="off" />
				<div class="modal__submit-container">
					<button type="button" class="body-medium cancle">취소</button>
					<button type="submit" class="body-medium ${
						this.isDelete ? 'delete' : 'regist'
					}">${this.isDelete ? '삭제' : '등록'}</button>
				</div>
			</form>
		`;
	}

	setEvent() {
		const modal = this.DOMElement.querySelector('.modal');
		const input = this.DOMElement.querySelector('#paymentMethod');

		this.DOMElement.addEventListener('click', (event) => {
			if (event.target === this.DOMElement) {
				document.body.removeChild(this.DOMElement);
			}
		});

		modal.addEventListener('submit', async (event) => {
			event.preventDefault();

			if (!input.value.length) {
				return;
			}

			await setLoadingInRequest(async () => {
				if (this.isDelete) {
					const res = await deletePaymentMethod(this.props.paymentMethod.id);
					store.dispatch(action.deletePaymentMethod({ id: res.id }));
				} else {
					const value = event.target.paymentMethod.value;
					const res = await addPaymentMethod(value);
					store.dispatch(
						action.addPaymentMethod({
							id: res.id,
							name: value,
						})
					);
				}
			});

			document.body.removeChild(this.DOMElement);
		});

		modal.addEventListener('click', (event) => {
			if (event.target.classList.contains('cancle')) {
				document.body.removeChild(this.DOMElement);
			}

			return;
		});
	}

	render() {
		this.DOMElement.innerHTML = this.template();
		this.setEvent();
	}
}

export default PaymentMethodModal;
