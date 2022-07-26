import categoryObj from '../constants/category';
import store from '../store/store';
import { getGroupedHistoryByExpense } from '../utils/history';
import { categoryBgColors } from '../constants/colors';
import LineChart from './LineChart';
import { getRecentHistory } from '../api/history';

class Donut {
	constructor() {
		this.DOMElement = document.createElement('div');
		this.DOMElement.className = 'donut';
		store.subscribe('history', this.render.bind(this));
		this.render();
	}

	getCanvasElement() {
		return this.DOMElement.querySelector('canvas');
	}

	template(groupedHistory) {
		const { totalExpense, categoryAndExpenseSumList } = groupedHistory;
		if (!totalExpense) return `<div></div>`;
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

		const year = store.getState('year');
		const month = store.getState('month');

		donutHistory.addEventListener('click', async (event) => {
			const donutHistoryItem = event.target.closest('.donut__history-item');
			if (!donutHistoryItem) {
				return;
			}

			const categoryId = Number(donutHistoryItem.dataset.categoryId);
			const recentHistory = await getRecentHistory(year, month, categoryId);
			const chart = this.DOMElement.parentNode.querySelector(
				'.line-chart__container'
			);

			if (chart) {
				chart.replaceWith(
					new LineChart({ categoryId, recentHistory }).DOMElement
				);
			} else {
				this.DOMElement.parentNode.appendChild(
					new LineChart({ categoryId, recentHistory }).DOMElement
				);
			}
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

	drawDonutChart(groupedHistory) {
		const MAX_ANGLE = 2 * Math.PI;

		const { totalExpense, categoryAndExpenseSumList } = groupedHistory;
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
		const history = store.getState('history');
		const groupedHistory = getGroupedHistoryByExpense(history);
		this.DOMElement.innerHTML = this.template(groupedHistory);
		this.drawDonutChart(groupedHistory);
		this.setEvent();
	}
}

export default Donut;
