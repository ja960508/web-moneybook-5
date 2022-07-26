export const API_ENDPOINT = process.env.API_ENDPOINT;

/**
 * @param {string} url
 * @param {RequestInit} options
 */
export default async function fetchData(url, options) {
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
