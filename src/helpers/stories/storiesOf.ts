import {
	Story,
	DecoratorParameters,
	RenderFunction,
	StoryDecorator,
	storiesOf as storybookStoriesOf
} from '@storybook/react';

const withStories = process.env.FLEXISUI_STORIES === 'true';

export function storiesOf(name: string, module: NodeModule): ExportableStory {

	if (withStories) {
		return storybookStoriesOf(name, module);
	}

	return new ExportableStory(name);
}

export class ExportableStory implements Story {

	kind: string;
	parameters?: DecoratorParameters = null;
	decorators?: StoryDecorator[] = [];
	stories?: Record<string, RenderFunction> = {};
	storiesParameters?: Record<string, DecoratorParameters> = {};

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
