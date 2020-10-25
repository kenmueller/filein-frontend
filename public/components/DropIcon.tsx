import cx from 'classnames'

import styles from 'styles/DropIcon.module.scss'

export interface DropIconProps {
	isDragging: boolean
}

const DropIcon = ({ isDragging }: DropIconProps) => (
	<div className={cx(styles.root, {
		[styles.dragging]: isDragging
	})} />
)

export default DropIcon
