Components Code Style [WIP]
---

### Pass `children` explicitly.

```jsx
const {
	children,
	...props
} = this.props;

<table
    {...getHtmlProps(props)}
>
    {children}
</table>
```

### Be sure to pass `props` on.

```jsx
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

### Pass `props` on before other props.

```jsx
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

### Pass `props` on to HTML-elements with `getHtmlProps` helper.

```jsx
<table
    {...getHtmlProps(props)}
>
    {children}
</table>
```

### Do not pass excess props.

```jsx
const {
    children,
    ...props // with `onChange`
} = this.props;

<div
    {...getHtmlProps(props, ['onChange'])}
>
    {children}
</div>
// or
Reflect.deleteProperty(props, 'onChange');

<Button
    {...props}
>
    {children}
</Button>
// ...
// `onChange` used in other place
onChange(event) {
    this.props.onChange(event.target.value);
}
```
