import categoryObj from '../constants/category';
import { getBgColorFromCSSClass } from '../utils/get_css_style';
import store from '../store/store';
import { getGroupedHistoryByExpense } from '../utils/history';

class Donut {
	constructor() {
		this.DOMElement = document.createElement('div');
		store.subscribe('history', this.render.bind(this));
		this.render();
	}

	get canvasElement() {
		return this.DOMElement.querySelector('canvas');
	}

	template() {
		return `<canvas>`;
	}

	setInitialCanvasSize() {
		const SIZE = 400;
		this.canvasElement.width = SIZE;
		this.canvasElement.height = SIZE;
	}

	setStrokeWidth(ctx) {
		ctx.lineWidth = 45;
	}

	setStrokeColor({ ctx, category }) {
		const categoryLabel = categoryObj[category];
		ctx.strokeStyle = getBgColorFromCSSClass(['category', categoryLabel]);
	}

	drawDonutChartPartial({ ctx, startAngle, angle, category }) {
		ctx.beginPath();
		const { width, height } = this.canvasElement;
		ctx.arc(width / 2, height / 2, 120, startAngle, startAngle + angle);
		this.setStrokeColor({ ctx, category });
		ctx.stroke();
	}

	drawDonutChart() {
		const MAX_ANGLE = 2 * Math.PI;
		const history = store.getState('history');
		const groupedHistory = getGroupedHistoryByExpense(history);
		const { totalExpense, categoryAndExpenseSumList } = groupedHistory;

		const ctx = this.canvasElement.getContext('2d');
		this.setStrokeWidth(ctx);

		let startAngle = 0;
		categoryAndExpenseSumList.forEach(({ expenseSum, category }) => {
			const angle = (expenseSum / totalExpense) * MAX_ANGLE;
			this.drawDonutChartPartial({ ctx, startAngle, angle, category });
			startAngle += angle;
		});
	}

	render() {
		this.DOMElement.innerHTML = this.template();
		this.setInitialCanvasSize();
		this.drawDonutChart();
	}
}

export default Donut;
