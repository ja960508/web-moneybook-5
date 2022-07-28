export function getPathnameFromHref(href) {
	return href.split('#')[0].split('?')[0];
}
