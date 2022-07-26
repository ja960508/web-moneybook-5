function getCurrentMonthData(payload) {
	return {
		type: 'GET_CURRENT_MONTH_DATA',
		payload,
	};
}

function getAllCategory(payload) {
	return {
		type: 'GET_ALL_CATEGORY',
		payload,
	};
}

function getAllPaymentMethod(payload) {
	return {
		type: 'GET_ALL_PAYMENT_METHOD',
		payload,
	};
}

function changeDate(payload) {
	return {
		type: 'CHANGE_DATE',
		payload,
	};
}

function addPaymentMethod(payload) {
	return {
		type: 'ADD_PAYMENT_METHOD',
		payload,
	};
}

function deletePaymentMethod(payload) {
	return {
		type: 'DELETE_PAYMENT_METHOD',
		payload,
	};
}

function addHistory(payload) {
	return {
		type: 'ADD_HISTORY',
		payload,
	};
}

export default {
	getCurrentMonthData,
	getAllCategory,
	getAllPaymentMethod,
	changeDate,
	addPaymentMethod,
	deletePaymentMethod,
	addHistory,
};
