// tslint:disable: ban-types
import {
	storiesOf as storybookStoriesOf
} from '@storybook/react';

const withStories = process.env.FLEXISUI_STORIES === 'true';

export function storiesOf(name: string, module: NodeModule): ExportableStory {

	if (withStories) {
		return storybookStoriesOf(name, module);
	}

	return new ExportableStory(name);
}

export class ExportableStory {

	kind: string;
	parameters?: Record<string, any> = null;
	decorators?: Function[] = [];
	stories?: Record<string, Function> = {};
	storiesParameters?: Record<string, Record<string, any>> = {};

	constructor(kind: string) {
		this.kind = kind;
	}

	addParameters(parameters) {
		this.parameters = parameters;
		return this;
	}

	addDecorator(decorator) {
		this.decorators.push(decorator);
		return this;
	}

	add(storyName, callback, parameters?) {
		this.stories[storyName] = callback;
		this.storiesParameters[storyName] = parameters;
		return this;
	}
}
