import cx from 'classnames'

import styles from 'styles/DropIcon.module.scss'

const DropIcon = ({ isDragging }: { isDragging: boolean }) => (
	<div className={cx(styles.root, {
		[styles.dragging]: isDragging
	})} />
)

export default DropIcon
