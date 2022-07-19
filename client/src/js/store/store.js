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

	function getChangedKeys(newState) {
		return Object.keys(newState).reduce(
			(changedKeys, key) =>
				state[key] !== newState[key] ? [...changedKeys, key] : changedKeys,
			[]
		);
	}

	function invokeListeners(key) {
		listeners.forEach((listener) => {
			if (listener.key === key) {
				listener.callback();
			}
		});
	}

	function notify(changedKeys) {
		changedKeys.forEach((key) => {
			invokeListeners(key);
		});
	}

	function dispatch(action) {
		const newState = reducer(state, action);
		if (isSameState(state, newState)) {
			return;
		}

		const changedKeys = getChangedKeys(newState);
		state = newState;
		notify(changedKeys);
	}

	return { subscribe, getState, dispatch };
}

export default createStore(reducer);
