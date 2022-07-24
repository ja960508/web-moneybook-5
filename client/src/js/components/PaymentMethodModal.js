class PaymentMethodModal {
	constructor(props) {
		this.DOMElement = document.createElement('div');
		this.DOMElement.className = 'modal-overlay';
		this.props = props;
		this.isDelete = Boolean(this.props.paymentMethod.content);

		document.body.appendChild(this.DOMElement);
		this.render();
	}

	template() {
		return `
			<form class="modal">
				<p class="body-medium">
					${this.props.title}
				</p>
				<input type="text" class="modal-input body-medium" value="${
					this.props.paymentMethod.content
				}" placeholder="입력하세요" ${this.isDelete ? 'readOnly' : ''} />
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

		modal.addEventListener('submit', (event) => {
			event.preventDefault();
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
