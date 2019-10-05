/**
 * WordPress dependencies
 */
import { renderToString } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { toElement } from './to-element';

/**
 * Create an HTML string from a Rich Text value. If a `multilineTag` is
 * provided, text separated by a line separator will be wrapped in it.
 *
 * @param {Object} $1                        Named argements.
 * @param {Object} $1.value                  Rich text value.
 * @param {string} [$1.multilineTag]         Multiline tag.
 *
 * @return {string} HTML string.
 */
export function toHTMLString( { value, multilineTag } ) {
	return renderToString( toElement( { value, multilineTag } ) );
}
