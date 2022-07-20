function getCurrentMonthData(payload) {
	return {
		type: 'GET_CURRENT_MONTH_DATA',
		payload,
	};
}

export default {
	getCurrentMonthData,
};
