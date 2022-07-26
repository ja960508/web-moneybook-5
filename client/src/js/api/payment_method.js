import fetchData, { API_ENDPOINT } from './request';

export async function getAllPaymentMethod() {
	return await fetchData(`${API_ENDPOINT}/paymentMethod`);
}

/**
 *
 * @param {string} value
 */
export async function addPaymentMethod(value) {
	return await fetchData(`${API_ENDPOINT}/paymentMethod`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({ value }),
	});
}

/**
 *
 * @param {number} id
 * @returns
 */
export async function deletePaymentMethod(id) {
	return await fetchData(`${API_ENDPOINT}/paymentMethod/${id}`, {
		method: 'DELETE',
	});
}
