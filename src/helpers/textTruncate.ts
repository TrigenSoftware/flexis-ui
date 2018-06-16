/**
 * Truncate text by given length;
 * @param  text - Text to truncate.
 * @param  length - Truncate length.
 * @return Truncated string.
 */
export function textTructate(text: string, length: number) {

	if (text.length <= length) {
		return text;
	}

	const subString = text.substr(0, length - 1);

	return `${subString.substr(0, subString.lastIndexOf(' '))}...`;
}
