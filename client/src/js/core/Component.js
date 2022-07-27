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

	setChildren(...children) {
		this.childComponents = this.childComponents.concat(children);
	}

	clearChildren() {
		this.childComponents.forEach((childComponent) =>
			childComponent.clearChildren()
		);

		this.unsubscribe.forEach((u) => u());
		this.childComponents = [];
	}

	clear() {
		this.clearChildren();
		this.DOMElement.innerHTML = ``;
	}
}

export default Component;
