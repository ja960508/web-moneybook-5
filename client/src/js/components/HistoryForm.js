import icons from '../constants/icons';
import store from '../store/store';
import MODAL_TYPE from '../constants/modal';

import { getPriceFormat } from '../utils/input_value_transformer';
import Modal from './Modal';
import { addHistory, updateHistory } from '../api/history';
import action from '../store/action';
import Component from '../core/Component';
import setLoadingInRequest from '../utils/request_loader';
import { addPaymentMethod, deletePaymentMethod } from '../api/payment_method';
import HistoryFormDropdown from './HistoryFormDropdown';
import { IsPaymentMethodExist } from '../utils/payment_method';

class HistoryForm extends Component {
	constructor() {
		super();
		this.DOMElement = document.createElement('form');
		this.DOMElement.className = 'history__form';
		this.subscribe('historyFormData', this.render.bind(this));
		this.setFormEvent();
		this.render();
	}

	enableSubmitButton() {
		this.DOMElement.querySelector('.history__form--submit').disabled = false;
	}

	disableSubmitButton() {
		this.DOMElement.querySelector('.history__form--submit').disabled = true;
	}

	setFormEvent() {
		this.DOMElement.addEventListener('input', () => {
			if (
				checkAllInputs(Array.from(this.DOMElement.querySelectorAll('input')))
			) {
				this.enableSubmitButton();
			} else {
				this.disableSubmitButton();
			}
		});

		this.DOMElement.addEventListener('submit', async (event) => {
			event.preventDefault();
			const {
				historyDate,
				historyCategory,
				historyContent,
				historyPaymentMethod,
				historyIsIncome,
				historyPrice,
			} = event.target;

			const date = historyDate.value;
			const category = historyCategory.value;
			const categoryId = historyCategory.dataset.categoryId;
			const content = historyContent.value;
			const isIncome = historyIsIncome.checked;
			const paymentMethod = historyPaymentMethod.value;
			const price = Number(historyPrice.value.replace(/,/g, ''));

			await setLoadingInRequest(async () => {
				this.DOMElement.reset();
				this.disableSubmitButton();

				const { id, isUpdateMode } = this.getState('historyFormData');
				const historyParam = {
					date,
					categoryId,
					content,
					paymentMethod,
					price,
				};

				const historyPayload = {
					date,
					category,
					categoryId,
					content,
					paymentMethod,
					isIncome,
					price,
				};

				if (isUpdateMode) {
					await setLoadingInRequest(async () => {
						await updateHistory({ id, ...historyParam });
						store.dispatch(action.updateHistory({ id, ...historyPayload }));
					});
				} else {
					await setLoadingInRequest(async () => {
						const newHistory = await addHistory(historyParam);
						store.dispatch(
							action.addHistory({ id: newHistory.id, ...historyPayload })
						);
					});
				}

				store.dispatch(action.resetHistoryFormData());
			});
		});
	}

	template() {
		const {
			date,
			categoryId,
			category,
			content,
			paymentMethod,
			isIncome,
			price,
		} = this.getState('historyFormData');

		return `
			<label for="historyDate" class="box18">
				<span class="bold-small">??????</span>
				<input id="historyDate" type="date" class="body-regular" value="${date}" />
			</label>
			<label for="historyCategory" class="box18">
				<span class="bold-small">??????</span>
				<input
					id="historyCategory"
					type="text"
					placeholder="???????????????"
					readonly
					class="body-regular"
					data-category-id="${categoryId}"
					value="${category}"
				/>
				<span class="arrow">
					${icons.arrow}
				</span>
				<div class="history__form-dropdown-category"></div>
			</label>
			<label for="historyContent" class="box23">
				<span class="bold-small">??????</span>
				<input
					id="historyContent"
					type="text"
					placeholder="???????????????"
					class="body-regular"
					maxlength="30"
					autocomplete="off"
					value="${content}"
				/>
			</label>
			<label for="historyPaymentMethod" class="box18">
				<span class="bold-small">????????????</span>
				<input
					id="historyPaymentMethod"
					type="text"
					placeholder="???????????????"
					readonly
					class="body-regular"
					value="${paymentMethod}"
				/>
				<span class="arrow">
					${icons.arrow}
				</span>
				<div class="history__form-dropdown-payment"></div>
			</label>
			<label for="historyPrice" class="box23">
				<span class="bold-small">??????</span>
				<div class="history__form-price-container">
					<input
						id="historyIsIncome"
						type="checkbox"
						class="history__form-income-toggle"
						${isIncome ? 'checked' : ''}
					></input>
					<input
						id="historyPrice"
						type="text"
						placeholder="???????????????"
						class="history__form-price body-regular"
						autocomplete="off"
						value="${price}"
					/>
					<span class="body-regular">???</span>
				</div>
			</label>
			<button type="submit" class="history__form--submit" disabled>
				${icons.check}
			</button>
    `;
	}

	render() {
		this.DOMElement.innerHTML = this.template();
		this.setEvent();
		const { isIncome } = this.getState('historyFormData');
		if (isIncome) this.DOMElement.classList.add('income-mode');
		else this.DOMElement.classList.remove('income-mode');
	}

	resetHistoryCategory() {
		this.DOMElement.querySelector('#historyCategory').value = '';
	}

	setEvent() {
		const categoryLabel = this.DOMElement.querySelector(
			'label[for="historyCategory"]'
		);
		const paymentMethodLabel = this.DOMElement.querySelector(
			'label[for="historyPaymentMethod"]'
		);
		const incomeToggleButton = this.DOMElement.querySelector(
			'.history__form-income-toggle'
		);
		const priceInput = this.DOMElement.querySelector('.history__form-price');

		categoryLabel.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (e.target.closest('.history__form-dropdown')) {
				return;
			}
			const onClear = () => {
				if (this.categoryDropdown) {
					this.clearChild(this.categoryDropdown);
					this.categoryDropdown = undefined;
				}

				return;
			};

			const dropdownCloseEvent = (e) => {
				if (e.target.closest('.history-from-dropdown')) {
					return;
				}

				onClear();
			};

			if (this.categoryDropdown) {
				onClear();

				return;
			}

			document.body.addEventListener('click', dropdownCloseEvent.bind(this), {
				once: true,
			});
			this.categoryDropdown = new HistoryFormDropdown(
				document.querySelector('.history__form-dropdown-category'),
				{
					isPaymentMethod: false,
					onClear,
					onClick: (event) => {
						const dropdownItem = event.target.closest('li');
						addCategoryToInput(categoryLabel, dropdownItem);
					},
				}
			);
			this.setChild(this.categoryDropdown);
		});

		paymentMethodLabel.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (e.target.closest('.history__form-dropdown')) {
				return;
			}

			const onClear = () => {
				if (this.paymentMethodDropdown) {
					this.clearChild(this.paymentMethodDropdown);
					this.paymentMethodDropdown = undefined;
				}

				return;
			};

			const dropdownCloseEvent = (e) => {
				if (e.target.closest('.history-from-dropdown')) {
					return;
				}

				onClear();
			};

			if (this.paymentMethodDropdown) {
				onClear();

				return;
			}

			document.body.addEventListener('click', dropdownCloseEvent.bind(this), {
				once: true,
			});

			this.paymentMethodDropdown = new HistoryFormDropdown(
				document.querySelector('.history__form-dropdown-payment'),
				{
					isPaymentMethod: true,
					onClear,
					onClick: (event) => showPaymentMethodModal(event, paymentMethodLabel),
				}
			);
			this.setChild(this.paymentMethodDropdown);
		});

		incomeToggleButton.addEventListener('click', () => {
			this.DOMElement.classList.toggle('income-mode');
			this.resetHistoryCategory();
		});

		priceInput.addEventListener('input', ({ target }) => {
			target.value = getPriceFormat(target.value);
		});
	}
}

function checkAllInputs(inputs) {
	return inputs.reduce((prev, input) => (!input.value ? false : prev), true);
}

function addCategoryToInput(label, dropdownItem) {
	const input = label.querySelector('input');

	input.value = dropdownItem.innerText || '';
	input.dataset.categoryId = dropdownItem.dataset.id;

	input.closest('form').dispatchEvent(new Event('input'));
}

function addPaymentMethodToInput(label, dropdownItem) {
	if (dropdownItem.tagName === 'BUTTON') {
		return;
	} else {
		const input = label.querySelector('input');
		input.value = dropdownItem.innerText || '';

		input.closest('form').dispatchEvent(new Event('input'));
	}
}

function showPaymentMethodModal(event, paymentMethodLabel) {
	const dropdownItem = event.target;
	if (dropdownItem.className === 'payment-method-add') {
		new Modal({
			title: '???????????? ??????????????? ???????????????.',
			content: '',
			modalType: MODAL_TYPE.add,
			onSubmit: async (value) => {
				if (IsPaymentMethodExist(value)) {
					return;
				}

				const res = await addPaymentMethod(value);

				store.dispatch(
					action.addPaymentMethod({
						id: res.id,
						name: value,
					})
				);
			},
		});
	} else if (dropdownItem.className === 'payment-method-delete') {
		const li = dropdownItem.closest('li');
		const id = li.dataset.id;
		const content = li.querySelector('span').innerText;

		new Modal({
			title: '?????? ??????????????? ?????????????????????????',
			content,
			modalType: MODAL_TYPE.remove,
			onSubmit: async (value) => {
				const res = await deletePaymentMethod(id);
				store.dispatch(action.deletePaymentMethod({ id: res.id }));
				store.dispatch(action.deletePaymentMethodInHistory({ value }));
				document.getElementById('historyPaymentMethod').value = '';
			},
		});
	} else {
		addPaymentMethodToInput(paymentMethodLabel, dropdownItem);
	}
}

export default HistoryForm;
