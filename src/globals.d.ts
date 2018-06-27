/**
 * Global typings.
 */

type StateValue = boolean | number | string;

interface IStateMap {
	[stateName: string]: StateValue;
}

interface IAttributeMap {
	className?: string;
	[attributeName: string]: StateValue | undefined;
}

interface IInheritedAttributes {
	className?: string;
	[props: string]: any;
}

type RuntimeStylesheet = {
	(className: string, states?: IStateMap, IInheritedAttributes?: IInheritedAttributes): IAttributeMap;
	$root: string;
	$namespace: string;
	$depth: number;
	$id: string | number;
	$css?: string;

	$get(localName: string): string | undefined;
	$cssStates(IStateMapping?: IStateMap | null): IStateMap;
} & { [localName: string]: string };

declare module '*.st.css' {
	const stylesheet: RuntimeStylesheet;
	export default stylesheet;
}
