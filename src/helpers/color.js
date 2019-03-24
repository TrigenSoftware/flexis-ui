/* eslint-disable import/unambiguous, no-magic-numbers */
const color = require('color');

function parsePercents(percents) {
	return parseInt(percents, 10) / 100;
}

function toString(color) {
	return color.valpha < 1
		? color.rgb().string()
		: color.hex();
}

module.exports = {

	textColor(backgroundColor, black, white) {
		return color(backgroundColor).isLight()
			? black
			: white;
	},

	darken(targetColor, percents) {
		return toString(
			color(targetColor).darken(parsePercents(percents))
		);
	},

	lighten(targetColor, percents) {
		return toString(
			color(targetColor).lighten(parsePercents(percents))
		);
	},

	opacity(targetColor, percents) {
		return toString(
			color(targetColor).alpha(parsePercents(percents))
		);
	}
};
