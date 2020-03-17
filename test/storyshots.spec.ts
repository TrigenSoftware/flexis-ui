import initStoryshots from '@trigen/scripts-plugin-storybook/jest/storyshots';

if (process.platform === 'linux') {

	process.env.FLEXISUI_STORIES = JSON.stringify(true);
	jest.setTimeout(600000);

	initStoryshots();

} else {
	it('should skip storyshots', () => {});
}
