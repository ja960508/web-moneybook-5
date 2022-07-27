import icons from '../constants/icons';
import store from '../store/store';
import paymentMethodType from '../constants/payment_method';
import { getPriceFormat } from '../utils/input_value_transformer';
import PaymentMethodModal from './PaymentMethodModal';
import { addHistory, updateHistory } from '../api/history';
import action from '../store/action';
import Component from '../core/Component';
import setLoadingInRequest from '../utils/request_loader';

class HistoryForm extends Component {
	constructor() {
		super();
		this.DOMElement = document.createElement('form');
		this.DOMElement.className = 'history__form';
		this.subscribe('paymentMethod', this.render.bind(this));
		this.subscribe('category', this.render.bind(this));
		this.subscribe('historyFormData', this.render.bind(this));
		this.setFormEvent();
		this.render();
	}

	enalbeSubmitButton() {
		this.DOMElement.querySelector('.history__form--submit').disabled = false;
	}

	disalbeSubmitButton() {
		this.DOMElement.querySelector('.history__form--submit').disabled = true;
	}

	setDropdownElement({ isPaymentMethod }) {
		const state = isPaymentMethod ? 'paymentMethod' : 'category';

		const dropdownContent = this.getState(state);

		return `
	<ul class="history__form-dropdown">
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
	</ul>`;
	}

	setFormEvent() {
		this.DOMElement.addEventListener('input', () => {
			if (
				checkAllInputs(Array.from(this.DOMElement.querySelectorAll('input')))
			) {
				this.enalbeSubmitButton();
			} else {
				this.disalbeSubmitButton();
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
				this.disalbeSubmitButton();

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
					await updateHistory({ id, ...historyParam });
					store.dispatch(action.updateHistory({ id, ...historyPayload }));
				} else {
					const newHistory = await addHistory(historyParam);
					store.dispatch(
						action.addHistory({ id: newHistory.id, ...historyPayload })
					);
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
				<span class="bold-small">일자</span>
				<input id="historyDate" type="date" class="body-regular" value="${date}" />
			</label>
			<label for="historyCategory" class="box18">
				<span class="bold-small">분류</span>
				<input
					id="historyCategory"
					type="text"
					placeholder="선택하세요"
					readonly
					class="body-regular"
					data-category-id="${categoryId}"
					value="${category}"
				/>
				<span class="arrow">
					${icons.arrow}
				</span>
				${this.setDropdownElement({ isPaymentMethod: false })}
			</label>
			<label for="historyContent" class="box23">
				<span class="bold-small">내용</span>
				<input
					id="historyContent"
					type="text"
					placeholder="입력하세요"
					class="body-regular"
					maxlength="30"
					autocomplete="off"
					value="${content}"
				/>
			</label>
			<label for="historyPaymentMethod" class="box18">
				<span class="bold-small">결제수단</span>
				<input
					id="historyPaymentMethod"
					type="text"
					placeholder="선택하세요"
					readonly
					class="body-regular"
					value="${paymentMethod}"
				/>
				<span class="arrow">
					${icons.arrow}
				</span>
				${this.setDropdownElement({ isPaymentMethod: true })}
			</label>
			<label for="historyPrice" class="box23">
				<span class="bold-small">금액</span>
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
						placeholder="입력하세요"
						class="history__form-price body-regular"
						autocomplete="off"
						value="${price}"
					/>
					<span class="body-regular">원</span>
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
		const categroyDropdown = categoryLabel.querySelector(
			'.history__form-dropdown'
		);
		const paymentMethodDropdown = paymentMethodLabel.querySelector(
			'.history__form-dropdown'
		);
		const incomeToggleButton = this.DOMElement.querySelector(
			'.history__form-income-toggle'
		);
		const priceInput = this.DOMElement.querySelector('.history__form-price');

		categoryLabel.addEventListener('click', (e) => {
			e.preventDefault();

			if (e.target.closest('.history__form-dropdown')) {
				return;
			}
			toggleDropdownElement(categoryLabel);
		});

		paymentMethodLabel.addEventListener('click', (e) => {
			e.preventDefault();
			if (e.target.closest('.history__form-dropdown')) {
				return;
			}
			toggleDropdownElement(paymentMethodLabel);
		});

		categroyDropdown.addEventListener('click', (event) => {
			const dropdownItem = event.target.closest('li');
			addCategoryToInput(categoryLabel, dropdownItem);
		});

		paymentMethodDropdown.addEventListener('click', ({ target }) => {
			const dropdownItem = target;

			if (dropdownItem.className === 'payment-method-add') {
				this.showPaymentMethodModal(
					'추가하실 결제수단을 적어주세요.',
					{ content: '' },
					paymentMethodType.add
				);
			} else if (dropdownItem.className === 'payment-method-delete') {
				const li = dropdownItem.closest('li');
				const id = li.dataset.id;
				const content = li.querySelector('span').innerText;

				this.showPaymentMethodModal(
					'해당 결제수단을 삭제하시겠습니까?',
					{
						content,
						id,
					},
					paymentMethodType.remove
				);
			} else {
				addPaymentMethodToInput(paymentMethodLabel, dropdownItem);
			}
		});

		incomeToggleButton.addEventListener('click', () => {
			this.DOMElement.classList.toggle('income-mode');
			this.resetHistoryCategory();
		});

		priceInput.addEventListener('input', ({ target }) => {
			target.value = getPriceFormat(target.value);
		});
	}

	showPaymentMethodModal(title = '', paymentMethod, paymentMethodType) {
		new PaymentMethodModal({ title, paymentMethod, paymentMethodType });
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
	toggleDropdownElement(label);
}

function addPaymentMethodToInput(label, dropdownItem) {
	if (dropdownItem.tagName === 'BUTTON') {
		return;
	} else {
		const input = label.querySelector('input');
		input.value = dropdownItem.innerText || '';

		input.closest('form').dispatchEvent(new Event('input'));
		toggleDropdownElement(label);
	}
}

function toggleDropdownElement(label) {
	if (
		label.htmlFor === 'historyCategory' ||
		label.htmlFor === 'historyPaymentMethod'
	) {
		label.querySelector('.history__form-dropdown').classList.toggle('show');
	}
}

export default HistoryForm;
