import { MAX_PRICE } from '../constants/history';

function setOnlyNumber(value) {
	return Number(value.replace(/[^0-9]/g, ''));
}

export function setPriceFormat(target) {
	const currentPrice =
		setOnlyNumber(target.value) > MAX_PRICE
			? MAX_PRICE
			: setOnlyNumber(target.value);

	target.value = currentPrice ? currentPrice.toLocaleString() : '';
}
