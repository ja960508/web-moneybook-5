const API_ENDPOINT = 'http://localhost:3000/api';

/**
 * @param {string} url
 * @param {RequestInit} options
 */
async function fetchData(url, options) {
	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error(`Request is not OK ${response.status}`);
		}

		return await response.json();
	} catch (e) {
		console.error(e);
	}
}

export async function getCurrentHistory(year, month) {
	return await fetchData(`${API_ENDPOINT}/history?year=${year}&month=${month}`);
}

export async function addHistory(history) {
	return await fetchData(`${API_ENDPOINT}/history`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify(history),
	});
}

export async function getAllCategory() {
	return await fetchData(`${API_ENDPOINT}/category`);
}

export async function getAllPaymentMethod() {
	return await fetchData(`${API_ENDPOINT}/paymentMethod`);
}

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

export async function deletePaymentMethod(id) {
	return await fetchData(`${API_ENDPOINT}/paymentMethod/${id}`, {
		method: 'DELETE',
	});
}
