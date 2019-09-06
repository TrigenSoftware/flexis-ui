import initStoryshots, {
	getMatchOptions
} from '@trigen/scripts-plugin-storybook/jest/storyshots';

process.env.FLEXISUI_STORIES = JSON.stringify(true);

initStoryshots({
	getMatchOptions(info) {

		const options = getMatchOptions(info);
		const failureThreshold = 0.05;

		return {
			failureThresholdType: 'percent',
			failureThreshold,
			...options
		};
	},
	getScreenshotOptions() {
		return {
			fullPage: false
		};
	}
});
