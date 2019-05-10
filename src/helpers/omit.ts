
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export function omit<T extends object, K extends keyof T>(
	inputProps: T,
	omitProps: K[]
): Omit<T, K>;

export function omit<T extends object>(
	inputProps: T,
	omitProps: string[]
): Partial<T>;

/**
 * Get React-HTML props from props object.
 * @param  inputProps - Props object.
 * @param  omitProps - Props to ignore.
 * @return Object with omited props.
 */
export function omit(inputProps, omitProps) {

	const props: any = {};

	for (const inputProp in inputProps) {

		if (!omitProps.includes(inputProp)) {
			props[inputProp] = inputProps[inputProp];
		}
	}

	return props;
}
