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

export default {
	getCurrentMonthData,
	getAllCategory,
	getAllPaymentMethod,
};
