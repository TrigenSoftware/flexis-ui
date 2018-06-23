
export type CombinePropsAndAttributes<U, T> = U & {
	[K in Exclude<keyof T, keyof U>]?: T[K]
};
