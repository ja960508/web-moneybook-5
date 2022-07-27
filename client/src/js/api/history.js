import fetchData, { API_ENDPOINT } from './request';

/**
 *
 * @param {number} year
 * @param {number} month
 */
export async function getCurrentHistory(year, month) {
	return await fetchData(`${API_ENDPOINT}/history?year=${year}&month=${month}`);
}

/**
 *
 * @param {object} history
 */
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

/**
 * @param {object} history
 */
export async function updateHistory(history) {
	return await fetchData(`${API_ENDPOINT}/history/${history.id}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method: 'PATCH',
		body: JSON.stringify(history),
	});
}

/**
 * @param {object} history
 */
export async function removeHistory(id) {
	return await fetchData(`${API_ENDPOINT}/history/${id}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method: 'DELETE',
		body: JSON.stringify(history),
	});
}

/**
 *
 * @param {number} year
 * @param {number} month
 * @param {number} categoryId
 */
export async function getRecentHistory(year, month, categoryId) {
	return await fetchData(
		`${API_ENDPOINT}/history/recent?year=${year}&month=${month}&categoryId=${categoryId}`
	);
}
