import store from '../store/store';
import action from '../store/action';

export default async function setLoadingInRequest(callback) {
	store.dispatch(action.setLoading());
	const result = await callback();
	store.dispatch(action.finishLoading());

	return result;
}
