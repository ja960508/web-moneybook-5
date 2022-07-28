import Component from '../core/Component';
import Donut from './Donut';
import LineChart from './LineChart';
import HistoryList from './HistoryList';
import { getRecentHistory } from '../api/history';
import { getGroupedHistoryByDay, getFilteredHistory } from '../utils/history';
import store from '../store/store';
import action from '../store/action';
import setLoadingInRequest from '../utils/request_loader';

class Analytics extends Component {
	constructor() {
		super();
		this.DOMElement = document.createElement('div');
		this.DOMElement.className = 'analytics';
		this.subscribe('date', this.render.bind(this));
		this.subscribe('history', this.render.bind(this));

		this.render();
	}

	async showLineChart(categoryId, categoryColor) {
		const { year, month } = this.getState('date');
		const history = this.getState('history');

		const recentHistory = await setLoadingInRequest(async () => {
			return await getRecentHistory(year, month, categoryId);
		});

		const groupedHistory = getGroupedHistoryByDay(history);
		const filteredHistory = getFilteredHistory(
			groupedHistory,
			(item) => Number(item.categoryId) === categoryId
		);

		this.childComponents.forEach((child) => {
			if (child instanceof LineChart || child instanceof HistoryList) {
				child.clearSelf();
			}
		});

		const lineChart = new LineChart({ categoryColor, recentHistory });
		const historyList = new HistoryList({ filteredHistory, inAnalytics: true });

		this.setChild(lineChart);
		this.setChild(historyList);
		this.DOMElement.appendChild(lineChart.DOMElement);
		this.DOMElement.appendChild(historyList.DOMElement);
	}

	render() {
		const date = this.getState('date');
		const history = this.getState('history');
		this.clearChildren();
		const donut = new Donut({
			history,
			onClick: this.showLineChart.bind(this),
		});

		this.DOMElement.appendChild(donut.DOMElement);
		this.setChild(donut);
	}
}

export default Analytics;
