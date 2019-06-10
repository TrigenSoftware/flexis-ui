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

	const subString = text.substr(0, length);
	const spaceIndex = subString.lastIndexOf(' ');
	const truncatedString = ~spaceIndex
		? subString.substr(0, spaceIndex)
		: subString;

	return `${truncatedString}...`;
}
