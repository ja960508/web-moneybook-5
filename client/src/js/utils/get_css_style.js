export function getBgColorFromCSSClass(classNames) {
	const tmp = document.createElement('div');
	classNames.forEach((className) => tmp.classList.add(className));
	document.body.appendChild(tmp);
	const bgColor = getComputedStyle(tmp).getPropertyValue('background-color');
	document.body.removeChild(tmp);
	return bgColor;
}
