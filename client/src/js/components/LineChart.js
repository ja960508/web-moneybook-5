import {
	NUM_OF_COLOUMNS,
	NUM_OF_ROWS,
	CELL_HEIGHT,
	CELL_WIDTH,
	X_PADDING,
	Y_PADDING,
	CANVAS_SCALE,
} from '../constants/line_chart.js';
import { MAX_MONTH } from '../constants/date';
import Component from '../core/Component.js';

class LineChart extends Component {
	constructor(props) {
		super();
		this.props = props;
		this.DOMElement = document.createElement('div');
		this.DOMElement.className = 'line-chart__container';
		this.totalExpense = this.getTotalExpenseByMonth();
		this.render();
	}

	template() {
		return `
		<canvas class="line-chart"></canvas>
		`;
	}

	render() {
		this.DOMElement.innerHTML = this.template();
		this.drawLineChart();
	}

	getMonthsColumnLabel(months) {
		const lastMonth = Number(months[months.length - 1]);
		const result = new Array(MAX_MONTH - months.length)
			.fill(0)
			.map((_, i) =>
				lastMonth + i + 1 > MAX_MONTH
					? lastMonth + i + 1 - MAX_MONTH
					: lastMonth + i + 1
			);

		return months.concat(result);
	}

	getExpenseValues() {
		const values = [];
		const months = [];
		const { totalExpense } = this;
		Object.keys(totalExpense)
			.sort((a, b) => a - b)
			.forEach((year) =>
				Object.keys(totalExpense[year])
					.sort((a, b) => a - b)
					.forEach((month) => {
						values.push(totalExpense[year][month]);
						months.push(month);
					})
			);

		return [values, this.getMonthsColumnLabel(months)];
	}

	drawLineChartColumns(context, chartHeight, months) {
		context.fillStyle = '#8D9393';
		context.textAlign = 'center';
		context.font = `${10 * CANVAS_SCALE}pt Do Hyeon`;

		for (let col = 0; col <= NUM_OF_COLOUMNS; col++) {
			const x = col * CELL_WIDTH + X_PADDING;
			context.moveTo(x, Y_PADDING);
			context.lineTo(x, chartHeight);
		}

		months.forEach((value, idx) =>
			context.fillText(
				value,
				CELL_WIDTH * (idx * 2 + 1) + X_PADDING,
				chartHeight + 20 * CANVAS_SCALE
			)
		);
	}

	drawLineChartRows(context, chartWidth) {
		for (let row = 0; row <= NUM_OF_ROWS; row++) {
			const y = row * CELL_HEIGHT + Y_PADDING;
			context.moveTo(X_PADDING, y);
			context.lineTo(chartWidth, y);
		}
	}

	drawLineChartAxes({ context, chartHeight, chartWidth, months }) {
		this.drawLineChartRows(context, chartWidth);
		this.drawLineChartColumns(context, chartHeight, months);

		context.lineWidth = 1;
		context.strokeStyle = '#c0c0c0';
		context.stroke();
	}

	getMaxValueForScaling(values) {
		let maxVal = 0;

		for (let i = 0; i < values.length; i++) {
			if (values[i] > maxVal) {
				maxVal = values[i];
			}
		}

		return maxVal * 1.2;
	}

	getLineChartPointsLocation(values, chartHeight, maxVal) {
		const points = [];

		for (let i = 0; i < values.length; i++) {
			const val = values[i];
			const px = CELL_WIDTH * (i * 2 + 1) + X_PADDING;
			const py = chartHeight - chartHeight * (val / maxVal);
			points.push({ x: px, y: py });
		} // 점 좌표 계산

		return points;
	}

	drawLineAnimation(context, start, end) {
		const xDistance = Math.floor(end.x - start.x);
		const dy = (end.y - start.y) / xDistance;

		if (xDistance === 0) {
			return;
		}

		const [nextX, nextY] = [
			start.x + 1 * CANVAS_SCALE,
			start.y + dy * CANVAS_SCALE,
		];
		context.beginPath();
		requestAnimationFrame(() => {
			context.moveTo(start.x, start.y);
			context.lineTo(nextX, nextY);
			context.lineWidth = 3 * CANVAS_SCALE;
			context.strokeStyle = this.props.categoryColor;
			context.stroke();
			this.drawLineAnimation(context, { x: nextX, y: nextY }, end);
		});
	}

	drawLine(context, points) {
		for (let i = 1; i < points.length; i++) {
			this.drawLineAnimation(context, { ...points[i - 1] }, { ...points[i] });
		}
	}

	drawPoints(context, values, points) {
		context.textAlign = 'center';
		context.font = `${10 * CANVAS_SCALE}pt Do Hyeon`;

		for (let i = 0; i < points.length; i++) {
			const point = points[i];
			const value = values[i].toLocaleString();
			context.fillStyle = '#626666';
			context.fillText(value, point.x, point.y - 15 * CANVAS_SCALE);

			context.fillStyle = this.props.categoryColor;
			context.beginPath();
			context.arc(point.x, point.y, 6 * CANVAS_SCALE, 0, 2 * Math.PI);
			context.fill();
		}
	}

	initCanvas() {
		const canvas = this.DOMElement.querySelector('.line-chart');
		const context = canvas.getContext('2d'); // 배경 렌더링
		canvas.width = NUM_OF_COLOUMNS * CELL_WIDTH + 2 * X_PADDING;
		canvas.height = NUM_OF_ROWS * CELL_HEIGHT + 2 * Y_PADDING;
		canvas.style.width = `${canvas.width / CANVAS_SCALE}px`;
		canvas.style.height = `${canvas.height / CANVAS_SCALE}px`;

		context.beginPath();
		context.fillStyle = '#FCFCFC';
		context.fillRect(0, 0, canvas.width, canvas.height);

		return [canvas, context];
	}

	drawLineChart() {
		const [canvas, context] = this.initCanvas();
		const chartWidth = canvas.width - X_PADDING;
		const chartHeight = canvas.height - Y_PADDING;
		const [values, months] = this.getExpenseValues();
		const maxVal = this.getMaxValueForScaling(values);
		const points = this.getLineChartPointsLocation(values, chartHeight, maxVal);

		this.drawLineChartAxes({ chartWidth, chartHeight, months, context });
		this.drawLine(context, points);
		this.drawPoints(context, values, points);
	}

	getTotalExpenseByMonth() {
		const result = {};
		const recentHistory = this.props.recentHistory;

		for (const year in recentHistory) {
			if (!result[year]) {
				result[year] = {};
			}

			for (const month in recentHistory[year]) {
				if (!result[year][month]) {
					result[year][month] = 0;
				}

				result[year][month] += recentHistory[year][month].reduce(
					(total, item) => total + item.price,
					0
				);
			}
		}

		return result;
	}
}

export default LineChart;
