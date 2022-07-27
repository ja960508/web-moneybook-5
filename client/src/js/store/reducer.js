const initialState = {
	date: {
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
	},
	history: [],
	category: [],
	paymentMethod: [],
	loading: false,
};

/**
 * @param {object} state
 * @param {object} action
 * @param {string} action.type
 * @param {*} action.payload
 */
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_CURRENT_MONTH_DATA':
			return { ...state, history: [...action.payload.history] };
		case 'GET_ALL_CATEGORY':
			return { ...state, category: action.payload };
		case 'GET_ALL_PAYMENT_METHOD':
			return { ...state, paymentMethod: action.payload };
		case 'CHANGE_DATE':
			return { ...state, date: action.payload };
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
		case 'ADD_HISTORY': {
			const month = new Date(action.payload.date).getMonth() + 1;
			if (month != state.date.month) {
				return { ...state };
			}
			return {
				...state,
				history: [action.payload, ...state.history],
			};
		}
		case 'SET_LOADING': {
			return {
				...state,
				loading: true,
			};
		}
		case 'FINISH_LOADING': {
			return {
				...state,
				loading: false,
			};
		}
		default:
			return state;
	}
}
