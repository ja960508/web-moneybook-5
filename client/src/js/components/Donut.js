import categoryObj from '../constants/category';
import { getExpenseSumListByCategory } from '../utils/history';
import { categoryBgColors } from '../constants/colors';
import Component from '../core/Component';
import { DONUT_CHART_SCALE } from '../constants/donut_chart';

class Donut extends Component {
	constructor(props) {
		super();
		this.DOMElement = document.createElement('div');
		this.props = props;
		this.DOMElement.className = 'donut';
		this.partialDonuts = [];
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

			const categoryText =
				donutHistoryItem.querySelector('.category').innerText;
			const categoryColor = categoryBgColors[categoryObj[categoryText]];
			const categoryId = Number(donutHistoryItem.dataset.categoryId);

			this.props.onClick(categoryId, categoryColor);
		});
	}

	setInitialCanvasSize() {
		const SIZE = 450 * DONUT_CHART_SCALE;
		const canvasElement = this.getCanvasElement();
		canvasElement.width = SIZE;
		canvasElement.height = SIZE;
		canvasElement.style.width = `${SIZE / DONUT_CHART_SCALE}px`;
		canvasElement.style.height = `${SIZE / DONUT_CHART_SCALE}px`;
	}

	setStrokeWidth(ctx) {
		ctx.lineWidth = 48 * DONUT_CHART_SCALE;
	}

	setStrokeColor({ ctx, category }) {
		const categoryLabel = categoryObj[category];
		ctx.strokeStyle = categoryBgColors[categoryLabel];
	}

	drawDonutChartPartialAnimation({
		ctx,
		startAngle,
		nextAngle,
		endAngle,
		d,
		category,
	}) {
		if (nextAngle >= endAngle) {
			return;
		}

		requestAnimationFrame(() => {
			ctx.beginPath();
			const { width, height } = this.getCanvasElement();

			ctx.arc(
				width / 2,
				height / 2,
				120 * DONUT_CHART_SCALE,
				startAngle,
				nextAngle + d
			);
			this.setStrokeColor({ ctx, category });
			ctx.stroke();

			this.drawDonutChartPartialAnimation({
				ctx,
				startAngle,
				nextAngle: nextAngle + d,
				endAngle,
				d,
				category,
			});
		});
	}

	drawDonutChartPartial({ ctx, startAngle, angle, category }) {
		const endAngle = startAngle + angle;
		const d = (endAngle - startAngle) / 30;
		const nextAngle = startAngle;

		this.drawDonutChartPartialAnimation({
			ctx,
			startAngle,
			nextAngle,
			endAngle,
			d,
			category,
		});
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
