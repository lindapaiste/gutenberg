/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Content from './content';

// In HTML, leading and trailing spaces are not visible, and multiple spaces
// elsewhere are visually reduced to one space. This rule prevents spaces from
// collapsing so all space is visible in the editor and can be removed. It also
// prevents some browsers from inserting non-breaking spaces at the end of a
// line to prevent the space from visually disappearing. Sometimes these non
// breaking spaces can linger in the editor causing unwanted non breaking spaces
// in between words. If also prevent Firefox from inserting a trailing `br` node
// to visualise any trailing space, causing the element to be saved.
//
// > Authors are encouraged to set the 'white-space' property on editing hosts
// > and on markup that was originally created through these editing mechanisms
// > to the value 'pre-wrap'. Default HTML whitespace handling is not well
// > suited to WYSIWYG editing, and line wrapping will not work correctly in
// > some corner cases if 'white-space' is left at its default value.
// >
// > https://html.spec.whatwg.org/multipage/interaction.html#best-practices-for-in-page-editors
const whiteSpace = 'pre-wrap';

export default forwardRef( ( {
	tagName: TagName = 'div',
	style = {},
	value,
	multilineTag,
	placeholder,
	prepareEditableTree,
	...remainingProps
}, ref ) => (
	<TagName
		// The label is changeable.
		aria-label={ placeholder }
		{ ...remainingProps }
		role="textbox"
		aria-multiline
		contentEditable
		suppressContentEditableWarning
		ref={ ref }
		style={ { ...style, whiteSpace } }
	>
		<Content
			value={ value }
			multilineTag={ multilineTag }
			placeholder={ placeholder }
			prepareEditableTree={ prepareEditableTree }
		/>
	</TagName>
) );
