import categoryObj from '../constants/category';
import store from '../store/store';
import { getExpenseSumListByCategory } from '../utils/history';
import { categoryBgColors } from '../constants/colors';
import LineChart from './LineChart';
import { getRecentHistory } from '../api/history';
import Component from '../core/component';

class Donut extends Component {
	constructor() {
		super();
		this.DOMElement = document.createElement('div');
		this.DOMElement.className = 'donut';
		this.unsubscribe = this.unsubscribe.concat(
			store.subscribe('history', this.render.bind(this))
		);
		this.render();
	}

	getCanvasElement() {
		return this.DOMElement.querySelector('canvas');
	}

	template(expenseSumList) {
		const { totalExpense, categoryAndExpenseSumList } = expenseSumList;

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

		const { year, month } = store.getState('date');

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

			const lineChart = new LineChart({ categoryId, recentHistory });

			if (chart) {
				chart.replaceWith(lineChart.DOMElement);
			} else {
				this.DOMElement.parentNode.appendChild(lineChart.DOMElement);
				this.setChildren(lineChart);
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
		const history = store.getState('history');
		const expenseSumList = getExpenseSumListByCategory(history);
		this.DOMElement.innerHTML = this.template(expenseSumList);
		this.drawDonutChart(expenseSumList);
		this.setEvent();
	}
}

export default Donut;
