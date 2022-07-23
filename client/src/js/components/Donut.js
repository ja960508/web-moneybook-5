import categoryObj from '../constants/category';
import { getBgColorFromCSSClass } from '../utils/get_css_style';

class Donut {
	constructor() {
		this.DOMElement = document.createElement('div');
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

		const totalExpense = 100000;
		const mock = [
			{ expenseSum: 50000, category: '생활' },
			{ expenseSum: 30000, category: '의료/건강' },
			{ expenseSum: 20000, category: '쇼핑/뷰티' },
		];

		const ctx = this.canvasElement.getContext('2d');
		this.setStrokeWidth(ctx);

		let startAngle = 0;
		mock.forEach(({ expenseSum, category }) => {
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
