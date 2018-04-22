/**
 * Truncate text by given length;
 * @param  {String} text - Text to truncate.
 * @param  {Number} length - Truncate length.
 * @return {String} Truncated string.
 */
export default function textTructate(text, length) {

	if (text.length <= length) {
		return text;
	}

	const subString = text.substr(0, length - 1);

	return `${subString.substr(0, subString.lastIndexOf(' '))}...`;
}
