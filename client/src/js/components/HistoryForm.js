import store from '../store/store';
import { setPriceFormat } from '../utils/input_value_transfomer';

class HistoryForm {
	constructor() {
		this.DOMElement = document.createElement('form');
		this.DOMElement.className = 'history__form';

		this.setFormEvent();
		this.render();
		this.setEvent();
	}

	setFormEvent() {
		this.DOMElement.addEventListener('input', () => {
			if (
				checkAllInputs(Array.from(this.DOMElement.querySelectorAll('input')))
			) {
				this.DOMElement.querySelector(
					'.history__form--submit'
				).disabled = false;
			}
		});

		this.DOMElement.addEventListener('submit', (event) => {
			event.preventDefault();
			const {
				historyDate,
				historyCategory,
				historyContent,
				historyPaymentMethod,
				historyPrice,
			} = event.target;
		});
	}

	template() {
		return `
			<label for="historyDate" class="box18">
				<span class="bold-small">일자</span>
				<input id="historyDate" type="date" class="body-regular" />
			</label>
			<label for="historyCategory" class="box18">
				<span class="bold-small">분류</span>
				<input
					id="historyCategory"
					type="text"
					placeholder="선택하세요"
					readonly
					class="body-regular"
				/>
				<span class="arrow">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M16 20L8 12L16 4"
							stroke="#FCFCFC"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</span>
				${setDropdownElement.call(this)}
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
				/>
				<span class="arrow">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M16 20L8 12L16 4"
							stroke="#FCFCFC"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</span>
				${setDropdownElement.call(this, true)}
			</label>
			<label for="historyPrice" class="box23">
				<span class="bold-small">금액</span>
				<div class="history__form-price-container">
					<button
						type="button"
						class="history__form-income-toggle"
						data-mode="minus"
					></button>
					<input
						id="historyPrice"
						type="text"
						placeholder="입력하세요"
						class="body-regular"
						autocomplete="off"
					/>
					<span class="body-regular">원</span>
				</div>
			</label>
			<button type="submit" class="history__form--submit" disabled>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M21 6L8.625 18L3 12.5455"
						stroke="#222222"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
    `;
	}

	render() {
		this.DOMElement.innerHTML = this.template();
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
		const priceInput = this.DOMElement.querySelector('#historyPrice');

		categoryLabel.addEventListener('click', () =>
			toggleDropdownElement(categoryLabel)
		);

		paymentMethodLabel.addEventListener('click', () =>
			toggleDropdownElement(paymentMethodLabel)
		);

		categroyDropdown.addEventListener('click', ({ target }) => {
			const dropdownItem = target;
			addCategoryToInput(categoryLabel, dropdownItem);
		});

		paymentMethodDropdown.addEventListener('click', ({ target }) => {
			const dropdownItem = target;
			addPaymentMethodToInput(paymentMethodLabel, dropdownItem);
		});

		incomeToggleButton.addEventListener('click', ({ target }) => {
			const dataset = target.dataset;
			dataset.mode = dataset.mode === 'plus' ? 'minus' : 'plus';
		});

		priceInput.addEventListener('input', ({ target }) => {
			setPriceFormat(target);
		});
	}
}

function checkAllInputs(inputs) {
	return inputs.reduce((prev, input) => (!input.value ? false : prev), true);
}

function addCategoryToInput(label, dropdownItem) {
	const input = label.querySelector('input');

	input.value = dropdownItem.innerText || '';

	input.closest('form').dispatchEvent(new Event('input'));
	toggleDropdownElement(label);
}

function addPaymentMethodToInput(label, dropdownItem) {
	if (dropdownItem.tagName === 'BUTTON') {
		return;
	} else {
		const input = label.querySelector('input');

		if (dropdownItem.tagName === 'SPAN') {
			input.value = dropdownItem.innerText || '';
		} else {
			input.value = dropdownItem.querySelector('span').innerText || '';
		}

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

function setDropdownElement(isPaymentMethod) {
	const state = isPaymentMethod ? 'paymentMethod' : 'category';

	const dropdownContent = store.getState(state);

	return `
	<ul class="history__form-dropdown">
		${dropdownContent
			.map(
				(item) => `<li data-id=${item.id}>
			<span>${item.name}</span>
			${isPaymentMethod ? `<button type="button">X</button>` : ''}
		</li>`
			)
			.join('')}
	</ul>`;
}

export default HistoryForm;
