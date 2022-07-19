import reducer from './reducer';

function createStore(reducer) {
	let listeners = [];
	let state = reducer(undefined, { type: null });

	function subscribe(key, callback) {
		const listener = { key, callback };
		listeners.push(listener);

		function unsubscribe() {
			listeners = listeners.filter((l) => l !== listener);
		}

		return unsubscribe;
	}

	function getState(key) {
		return state[key];
	}

	return { subscribe, getState };
}

export default createStore(reducer);
