import fetchData, { API_ENDPOINT } from './request';

export async function getAllCategory() {
	return await fetchData(`${API_ENDPOINT}/category`);
}
