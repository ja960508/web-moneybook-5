import { MAX_PRICE } from '../constants/history';

function setOnlyNumber(value) {
	return Number(value.replace(/[^0-9]/g, ''));
}

export function getPriceFormat(value) {
	const number = setOnlyNumber(value);
	const currentPrice = number > MAX_PRICE ? MAX_PRICE : number;

	return currentPrice ? currentPrice.toLocaleString() : '';
}
