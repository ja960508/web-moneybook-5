const API_ENDPOINT = 'http://localhost:3000/api';

export async function getCurrentHistory(year, month) {
	try {
		const response = await fetch(
			`${API_ENDPOINT}/history?year=${year}&month=${month}`
		);

		if (!response.ok) {
			throw new Error(`Request is not OK ${response.status}`);
		}

		return await response.json();
	} catch (e) {
		return e;
	}
}

export async function getAllCategory() {
	try {
		const response = await fetch(`${API_ENDPOINT}/category`);

		if (!response.ok) {
			throw new Error(`Request is not OK ${response.status}`);
		}

		return await response.json();
	} catch (e) {
		return e;
	}
}

export async function getAllPaymentMethod() {
	try {
		const response = await fetch(`${API_ENDPOINT}/paymentMethod`);
		if (!response.ok) {
			throw new Error(`Request is not OK ${response.status}`);
		}

		return await response.json();
	} catch (e) {
		return e;
	}
}

export async function addPaymentMethod(value) {
	try {
		const response = await fetch(`${API_ENDPOINT}/paymentMethod`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ value }),
		});

		if (!response.ok) {
			throw new Error(`Request is not OK ${response.status}`);
		}

		return await response.json();
	} catch (e) {
		return e;
	}
}

export async function deletePaymentMethod(id) {
	try {
		const response = await fetch(`${API_ENDPOINT}/paymentMethod/${id}`, {
			method: 'DELETE',
		});

		if (!response.ok) {
			throw new Error(`Request is not OK ${response.status}`);
		}

		return await response.json();
	} catch (e) {
		return e;
	}
}
