import store from '../store/store';
import action from '../store/action';

export default async function setLoadingInRequest(callback) {
	document.body.style.overflow = 'hidden';
	store.dispatch(action.setLoading());
	const result = await callback();
	store.dispatch(action.finishLoading());
	document.body.setAttribute('style', '');

	return result;
}
