const initialState = {};

/**
 * @param {object} state
 * @param {object} action
 * @param {string} action.type
 * @param {*} action.payload
 */
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_CURRENT_MONTH_DATA':
			return action.payload;
		case 'GET_ALL_CATEGORY':
			return { ...state, category: action.payload };
		case 'GET_ALL_PAYMENT_METHOD':
			return { ...state, paymentMethod: action.payload };
		case 'ADD_PAYMENT_METHOD':
			return {
				...state,
				paymentMethod: state.paymentMethod.concat(action.payload),
			};
		case 'DELETE_PAYMENT_METHOD':
			return {
				...state,
				paymentMethod: state.paymentMethod.filter(
					(item) => item.id !== Number(action.payload.id)
				),
			};
		default:
			return state;
	}
}
