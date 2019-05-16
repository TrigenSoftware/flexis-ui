import PropTypes from 'prop-types';

export type Primitive = string|number|boolean;

export type InputValue = string|number;

export type SelectValue = Primitive|Primitive[];

export enum PlacementVariant {
	Top = 'top',
	Right = 'right',
	Bottom = 'bottom',
	Left = 'left'
}

export type Placement = 'top'|'right'|'bottom'|'left';

export enum AlignVariant {
	Start = 'start',
	Center = 'center',
	End = 'end'
}

export type Align = 'start'|'center'|'end';

export enum AlignSideVariant {
	Left = 'left',
	Right = 'right'
}

export type AlignSide = 'left'|'right';

export const PrimitivePropType = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.number,
	PropTypes.bool
]);

export const InputValuePropType = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.number
]);

export const SelectValuePropType = PropTypes.oneOfType([
	PrimitivePropType,
	PropTypes.arrayOf(PrimitivePropType)
]);

export const PlacementValues: Placement[] = Object.values(PlacementVariant);

export const AlignValues: Align[] = Object.values(AlignVariant);

export const AlignSideValues: AlignSide[] = Object.values(AlignSideVariant);
