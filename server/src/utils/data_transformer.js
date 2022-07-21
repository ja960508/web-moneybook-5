function isString(value) {
  return typeof value === 'string';
}

export function timeConverter(date) {
  return date.toLocaleDateString().split('. ').join('-').slice(0, -1);
}

export function addQuotesToString(value) {
  return isString(value) ? `"${value}"` : value;
}
