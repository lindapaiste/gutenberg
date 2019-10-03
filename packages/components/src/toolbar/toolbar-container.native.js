/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import { withTheme } from '../mobile/dark-mode';

const ToolbarContainer = ( { useStyle, passedStyle, children, rtl = false } ) => (
	<View style={ [ useStyle( styles.container, styles.leftBorder, styles.containerDark ), passedStyle, rtl ? styles.rightBorder : styles.leftBorder] }>
		{ children }
	</View>
);

export default withTheme( ToolbarContainer );
