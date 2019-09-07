import initStoryshots from '@trigen/scripts-plugin-storybook/jest/storyshots';

process.env.FLEXISUI_STORIES = JSON.stringify(true);

if (process.platform === 'linux') {
	initStoryshots();
} else {
	it('should skip storyshots', () => {});
}
