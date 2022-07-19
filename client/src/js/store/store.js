import reducer from './reducer';

function isSameState(state, newState) {
	return JSON.stringify(state) === JSON.stringify(newState);
}

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

	function notify() {}

	function dispatch(action) {
		const newState = reducer(state, action);
		if (isSameState(state, newState)) {
			return;
		}

		notify();
	}

	return { subscribe, getState, dispatch };
}

export default createStore(reducer);
