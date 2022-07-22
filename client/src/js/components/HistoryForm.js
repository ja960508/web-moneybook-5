class HistoryForm {
	constructor() {
		this.DOMElement = document.createElement('form');
		this.DOMElement.className = 'history__form';

		this.render();
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
				<ul class="history__form-dropdown">
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
				</ul>
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
				<ul class="history__form-dropdown">
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
				</ul>
			</label>
			<label for="historyPrice" class="box23">
				<span class="bold-small">금액</span>
				<div class="history__form-price-container">
					<button
						class="history__form-income-toggle"
						data-mode="minus"
					></button>
					<input
						id="historyPrice"
						type="text"
						placeholder="입력하세요"
						class="body-regular"
					/>
					<span class="body-regular">원</span>
				</div>
			</label>
			<button type="submit" class="history__form--submit">
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
}

export default HistoryForm;
