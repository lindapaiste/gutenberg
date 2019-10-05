/**
 * WordPress dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import { toObjectTree } from './to-object-tree';

/**
 * Create an element tree from a Rich Text value. If a `multilineTag` is
 * provided, text separated by a line separator will be wrapped in it.
 *
 * @param {Object} $1                        Named argements.
 * @param {Object} $1.value                  Rich text value.
 * @param {string} [$1.multilineTag]         Multiline tag.
 *
 * @return {string} HTML string.
 */
export function toElement( {
	value,
	multilineTag,
	prepareEditableTree,
	placeholder,
} ) {
	if ( prepareEditableTree ) {
		value = {
			...value,
			formats: prepareEditableTree( value ),
		};
	}

	const tree = toObjectTree( {
		value,
		multilineTag,
		isEditableTree: true,
		placeholder,
	} );
	const elementTree = createElementTree( tree.children );

	return createElement( Fragment, null, ...elementTree );
}

function camelCase( string ) {
	return string
		.toLowerCase()
		.replace( /-([a-z])/g, ( match, $1 ) => $1.toUpperCase() );
}

function createElementTree( objects = [] ) {
	return objects.map( ( { type, attributes, object, children, text } ) => {
		if ( text !== undefined ) {
			return text;
		}

		if ( attributes ) {
			const { style, contentEditable } = attributes;

			// Backward compatibility: adjust the style value to an object. We
			// don't adjust any attribute keys because React will still render
			// them correctly and log a warning.
			if ( typeof style === 'string' ) {
				deprecated( 'rich text format type with style attribute as CSS string', {
					alternative: 'object with camelCased properties, consistent with the DOM style property',
				} );

				attributes.style = style
					.split( ';' )
					.reduce( ( accumulator, piece ) => {
						let [ key = '', value = '' ] = piece.split( ':' );

						key = camelCase( key ).trim();
						value = value.trim();

						if ( key && value ) {
							accumulator[ key ] = value;
						}

						return accumulator;
					}, {} );
			}

			if ( contentEditable !== undefined ) {
				attributes.suppressContentEditableWarning = true;
			}
		}

		if ( object ) {
			return createElement( type, attributes );
		}

		return createElement( type, attributes, ...createElementTree( children ) );
	} );
}
