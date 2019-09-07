import initStoryshots from '@trigen/scripts-plugin-storybook/jest/storyshots';

process.env.FLEXISUI_STORIES = JSON.stringify(true);

initStoryshots();
