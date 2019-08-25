import initStoryshots, {
	getMatchOptions
} from '@trigen/scripts-plugin-storybook/jest/storyshots';

process.env.FLEXISUI_STORIES = JSON.stringify(true);

initStoryshots({
	getMatchOptions(info) {

		const options = getMatchOptions(info);
		let failureThreshold = 0.2;

		switch (options.customSnapshotIdentifier) {

			case 'ScrollArea__with-table':
				failureThreshold = 5;
				break;

			case 'Table__with-rows':
			case 'Table__with-order':
				failureThreshold = 1;
				break;

			default:
		}

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
