import store from '../store/store';

class LineChart {
	constructor(props) {
		this.props = props;
		this.DOMElement = document.createElement('div');
		this.DOMElement.className = 'line-chart__container';
		this.totalExpense = this.getTotalExpenseByMonth();
		this.unsubscribe = store.subscribe('history', this.init.bind(this));
		this.render();
	}

	init() {
		this.unsubscribe();
		this.DOMElement.remove();
	}

	template() {
		return `<canvas class="line-chart"></canvas>`;
	}

	render() {
		this.DOMElement.innerHTML = this.template();
		this.drawLineChart();
	}

	getExpenseValues() {
		const result = [];
		const { totalExpense } = this;

		Object.keys(totalExpense)
			.sort((a, b) => a - b)
			.forEach((year) =>
				Object.keys(totalExpense[year])
					.sort((a, b) => a - b)
					.forEach((month) => {
						result.push(totalExpense[year][month]);
					})
			);

		return result;
	}

	drawLineChart() {
		const canvas = this.DOMElement.querySelector('.line-chart');
		const context = canvas.getContext('2d'); // 배경 렌더링
		const [NUM_OF_COLOUMNS, NUM_OF_ROWS] = [24, 12];
		const [CELL_WIDTH, CELL_HEIGHT] = [33, 26];
		const [X_PADDING, Y_PADDING] = [32, 30];
		const values = this.getExpenseValues();
		canvas.width = NUM_OF_COLOUMNS * CELL_WIDTH + 2 * X_PADDING;
		canvas.height = NUM_OF_ROWS * CELL_HEIGHT + 2 * Y_PADDING;
		const chartWidth = canvas.width - X_PADDING;
		const chartHeight = canvas.height - Y_PADDING;

		context.fillStyle = '#FCFCFC';
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.beginPath();

		// draw Row
		for (let row = 0; row <= NUM_OF_ROWS; row++) {
			const y = row * CELL_HEIGHT + Y_PADDING;
			context.moveTo(X_PADDING, y);
			context.lineTo(chartWidth, y);
		}

		// draw Column
		context.fillStyle = '#8D9393';
		context.textAlign = 'center';
		context.font = '10pt Do Hyeon';

		for (let col = 0; col <= NUM_OF_COLOUMNS; col++) {
			const x = col * CELL_WIDTH + X_PADDING;
			context.moveTo(x, Y_PADDING);
			context.lineTo(x, chartHeight);

			if (col > 0 && col % 2) {
				context.fillText(
					'month',
					CELL_WIDTH * col + X_PADDING,
					canvas.height - 10
				);
			}
		}

		context.lineWidth = 1;
		context.strokeStyle = '#c0c0c0';
		context.stroke();

		let maxVal = 0;

		for (let i = 0; i < values.length; i++) {
			if (values[i] > maxVal) maxVal = values[i];
		} // 비율 계산을 위해 최대값 구하기

		maxVal = maxVal * 1.2; // 최대값 기준 스케일링

		const points = [];

		for (let i = 0; i < values.length; i++) {
			const val = values[i];
			const px = CELL_WIDTH * (i * 2 + 1) + X_PADDING;
			const py = chartHeight - chartHeight * (val / maxVal);
			points.push({ x: px, y: py });
		} // 점 좌표 계산

		context.beginPath();
		context.moveTo(points[0].x, points[0].y);

		// 0번으로 Move후 각 point에 따라 선 그리기
		for (let i = 1; i < points.length; i++) {
			context.lineTo(points[i].x, points[i].y);
		}

		context.lineWidth = 2;
		context.strokeStyle = '#A0E1E0';
		context.stroke();

		context.textAlign = 'center';
		context.font = '10pt Do Hyeon';

		for (let i = 0; i < points.length; i++) {
			const point = points[i];
			const value = values[i].toLocaleString();
			context.fillStyle = '#626666';
			context.fillText(value, point.x, point.y - 15);
			context.fillStyle = '#2AC1BC';
			context.beginPath();
			context.arc(point.x, point.y, 4, 0, 2 * Math.PI);
			context.fill();
		} // 점, 숫자 그리기
	}

	getTotalExpenseByMonth() {
		const result = {};
		const history = this.props.history;

		for (const year in history) {
			if (!result[year]) {
				result[year] = {};
			}

			for (const month in history[year]) {
				if (!result[year][month]) {
					result[year][month] = 0;
				}

				result[year][month] += history[year][month].reduce((total, item) => {
					return total + item.price;
				}, 0);
			}
		}

		return result;
	}
}

export default LineChart;
