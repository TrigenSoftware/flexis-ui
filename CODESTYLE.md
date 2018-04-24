Components Code Style [WIP]
---

## Pass `children` explicitly.

```js
const {
	children,
	...props
} = this.props;

return (
	<table
		{...getHtmlProps(props)}
	>
		{children}
	</table>
);
```

## Be sure to pass `props` on.

```js
export function MenuButton({
	children,
	...props
}) {
	return (
		<Button
			{...props}
		>
			{children}
		</Button>
	);
}
```

## Pass `props` on before other props.

```js
<Button
    {/* Firstly */}
    {...props}
    {/* Other props */}
    {...stylesheet('button', {}, props)}
    type='button'
>
    {children}
</Button>
```

## Pass `props` on to HTML-elements with `getHtmlProps` helper.

```js
<table
    {...getHtmlProps(props)}
>
    {children}
</table>
```
