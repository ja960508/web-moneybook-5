export function moveScrollToHitoryItem({ hash, highlight = false }) {
	const hashLink = document.querySelector(`[href="${hash}"`);
	if (hashLink) {
		window.scrollTo(0, window.scrollY + hashLink.getBoundingClientRect().top);
		if (highlight) hashLink.closest('li').classList.add('highlight');
	}
}
