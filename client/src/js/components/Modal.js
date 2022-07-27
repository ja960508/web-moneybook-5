import MODAL_TYPE from '../constants/modal';
import setLoadingInRequest from '../utils/request_loader';

class Modal {
	constructor(props) {
		this.DOMElement = document.createElement('div');
		this.DOMElement.className = 'modal-overlay';
		this.props = props;
		this.isDelete = Boolean(this.props.modalType === MODAL_TYPE.remove);

		this.toggleBodyOverflow();
		document.body.appendChild(this.DOMElement);
		this.render();
	}

	template() {
		return `
			<form class="modal">
				<p class="body-medium">
					${this.props.title}
				</p>
				<input id="modalContent" type="text" class="modal-input body-medium" value="${
					this.props.content
				}" placeholder="입력하세요" ${
			this.isDelete ? 'readOnly' : ''
		} maxlength=10 autocomplete="off" />
				<div class="modal__submit-container">
					<button type="button" class="body-medium cancel">취소</button>
					<button type="submit" class="body-medium ${
						this.isDelete ? 'delete' : 'regist'
					}">${this.isDelete ? '삭제' : '등록'}</button>
				</div>
			</form>
		`;
	}

	toggleBodyOverflow() {
		if (document.body.style.overflow === 'hidden') {
			document.body.style.overflow = '';
		} else {
			document.body.style.overflow = 'hidden';
		}
	}

	setEvent() {
		const modal = this.DOMElement.querySelector('.modal');
		const input = this.DOMElement.querySelector('#modalContent');

		this.DOMElement.addEventListener('click', (event) => {
			if (event.target === this.DOMElement) {
				this.DOMElement.remove();
				this.toggleBodyOverflow();
			}
		});

		modal.addEventListener('submit', async (event) => {
			event.preventDefault();

			if (!input.value.length) {
				return;
			}

			await setLoadingInRequest(async () => {
				await this.props.onSubmit(event.target.modalContent.value);
			});

			this.toggleBodyOverflow();
			this.DOMElement.remove();
		});

		modal.addEventListener('click', (event) => {
			if (event.target.classList.contains('cancel')) {
				this.DOMElement.remove();
			}

			return;
		});
	}

	render() {
		this.DOMElement.innerHTML = this.template();
		this.setEvent();
	}
}

export default Modal;
