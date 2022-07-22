export function getGroupedHistoryByDay(history) {
	const result = {};

	history.forEach((item) => {
		if (!result[item.day]) {
			result[item.day] = { history: [], incomeSum: 0, expenseSum: 0 };
		}

		result[item.day].history.push(item);
		if (item.isIncome) {
			result[item.day].incomeSum += item.price;
		} else {
			result[item.day].expenseSum += item.price;
		}
	});

	return result;
}
