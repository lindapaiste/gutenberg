/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { cloneElement, Children } from '@wordpress/element';

function ResponsiveWrapper( { naturalWidth, naturalHeight, children } ) {
	if ( Children.count( children ) !== 1 ) {
		return null;
	}
	const imageStyle = {
		paddingBottom: ( naturalHeight / naturalWidth * 100 ) + '%',
	};
	return (
		<span className="components-responsive-wrapper">
			<span style={ imageStyle } />
			{ cloneElement( children, {
				className: classnames( 'components-responsive-wrapper__content', children.props.className ),
			} ) }
		</span>
	);
}

export default ResponsiveWrapper;
