export function setPriceFormat(target) {
	const currentPrice =
		Number(target.value.replace(/[^0-9]/g, '')) > 3000000
			? 3000000
			: Number(target.value.replace(/[^0-9]/g, ''));
	target.value = currentPrice.toLocaleString();
}
