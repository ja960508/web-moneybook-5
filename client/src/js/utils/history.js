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

export function getGroupedHistoryByExpense(history) {
	const result = new Map();
	let totalExpense = 0;

	history.forEach((item) => {
		if (item.isIncome) return;

		if (!result.has(item.category)) {
			result.set(item.category, { categoryId: item.categoryId, expenseSum: 0 });
		}

		const original = result.get(item.category);
		result.set(item.category, {
			...original,
			expenseSum: original.expenseSum + item.price,
		});
		totalExpense += item.price;
	});

	return {
		totalExpense,
		categoryAndExpenseSumList: [...result]
			.map((item) => ({
				category: item[0],
				categoryId: item[1].categoryId,
				expenseSum: item[1].expenseSum,
			}))
			.sort((a, b) => b.expenseSum - a.expenseSum),
	};
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
