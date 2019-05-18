/**
 * Is keyboard press like mouse click.
 * @param  key - Key description.
 * @return Boolean result.
 */
export default function isKeyboardClick(key: string) {
	return key === ' ' || key === 'Enter';
}
