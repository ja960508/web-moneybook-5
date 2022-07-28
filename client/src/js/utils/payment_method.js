import store from '../store/store';

export function IsPaymentMethodExist(value) {
	const paymentMethod = store.getState('paymentMethod');

	return paymentMethod.some((item) => item.name === value);
}
