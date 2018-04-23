
const base = 36,
	start = 2,
	end = 9;

/**
 * Generate unique id.
 * @return {String} Uniquie id.
 */
export default function generateId() {
	return Math.random().toString(base).substr(start, end);
}
