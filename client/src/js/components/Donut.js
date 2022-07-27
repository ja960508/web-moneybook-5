import categoryObj from '../constants/category';
import { getExpenseSumListByCategory } from '../utils/history';
import { categoryBgColors } from '../constants/colors';
import Component from '../core/Component';

class Donut extends Component {
	constructor(props) {
		super();
		this.DOMElement = document.createElement('div');
		this.props = props;
		this.DOMElement.className = 'donut';
		this.render();
	}

	getCanvasElement() {
		return this.DOMElement.querySelector('canvas');
	}

	template(expenseSumList) {
		const { totalExpense, categoryAndExpenseSumList } = expenseSumList;

		return `
			<canvas></canvas>
			<div class="donut__right">
				<h3 class="body-large">이번 달 지출 금액 ${totalExpense.toLocaleString()}</h3>
				<ul class="donut__history">
					${categoryAndExpenseSumList
						.map(
							(item) => `
						<li class="donut__history-item" data-category-id=${item.categoryId}>
							<div>
								<div class="category ${categoryObj[item.category]} bold-medium">${
								item.category
							}</div>
								<div class="body-medium">${((item.expenseSum / totalExpense) * 100).toFixed(
									0
								)}%</div>
							</div>
							<div class="body-medium">${item.expenseSum.toLocaleString()}</div>
						</li>
					`
						)
						.join('')}
				</ul>
			</div>
		`;
	}

	setEvent() {
		const donutHistory = this.DOMElement.querySelector('.donut__history');
		if (!donutHistory) {
			return;
		}

		donutHistory.addEventListener('click', (event) => {
			const donutHistoryItem = event.target.closest('.donut__history-item');

			const categoryId = Number(donutHistoryItem.dataset.categoryId);

			this.props.onClick(categoryId);
		});
	}

	setInitialCanvasSize() {
		const SIZE = 450;
		const canvasElement = this.getCanvasElement();
		canvasElement.width = SIZE;
		canvasElement.height = SIZE;
	}

	setStrokeWidth(ctx) {
		ctx.lineWidth = 48;
	}

	setStrokeColor({ ctx, category }) {
		const categoryLabel = categoryObj[category];
		ctx.strokeStyle = categoryBgColors[categoryLabel];
	}

	drawDonutChartPartial({ ctx, startAngle, angle, category }) {
		ctx.beginPath();
		const { width, height } = this.getCanvasElement();
		ctx.arc(width / 2, height / 2, 120, startAngle, startAngle + angle);
		this.setStrokeColor({ ctx, category });
		ctx.stroke();
	}

	drawDonutChart(expenseSumList) {
		const MAX_ANGLE = 2 * Math.PI;

		const { totalExpense, categoryAndExpenseSumList } = expenseSumList;
		if (!totalExpense) return;

		this.setInitialCanvasSize();
		const ctx = this.getCanvasElement().getContext('2d');
		this.setStrokeWidth(ctx);

		let startAngle = -MAX_ANGLE / 4;
		categoryAndExpenseSumList.forEach(({ expenseSum, category }) => {
			const angle = (expenseSum / totalExpense) * MAX_ANGLE;
			this.drawDonutChartPartial({ ctx, startAngle, angle, category });
			startAngle += angle;
		});
	}

	render() {
		const { history } = this.props;
		const expenseSumList = getExpenseSumListByCategory(history);
		this.DOMElement.innerHTML = this.template(expenseSumList);
		this.drawDonutChart(expenseSumList);
		this.setEvent();
	}
}

export default Donut;
