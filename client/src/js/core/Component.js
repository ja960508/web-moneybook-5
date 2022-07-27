class Component {
	constructor() {
		this.childComponents = [];
		this.unsubscribe = [];
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
