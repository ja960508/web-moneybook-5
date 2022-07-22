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

export function getMonthTotalMoney(groupedHistory) {
	const result = { income: 0, expense: 0 };

	for (const day in groupedHistory) {
		result.income += groupedHistory[day].incomeSum;
		result.expense += groupedHistory[day].expenseSum;
	}
	result.sum = result.income - result.expense;

	return result;
}
