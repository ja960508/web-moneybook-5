import store from '../store/store';

class Component {
	constructor() {
		this.childComponents = [];
		this.unsubscribe = [];
		this.keys = new Set();
	}

	subscribe(key, callback) {
		this.keys.add(key);
		this.unsubscribe.push(store.subscribe(key, callback));
	}

	getState(key) {
		if (!this.keys.has(key)) {
			throw new Error(`Doesn't have a key`);
		}

		return store.getState(key);
	}

	setChild(children) {
		this.childComponents.push(children);
	}

	clearChildren() {
		this.childComponents.forEach((childComponent) => {
			childComponent.unsubscribe.forEach((u) => u());
			childComponent.clearChildren();
			childComponent.DOMElement.remove();
		});

		this.childComponents = [];
	}

	clearSelf() {
		this.DOMElement.remove();
		this.unsubscribe.forEach((u) => u());
		this.clearChildren();
	}
}

export default Component;
