import { ReactNode, useState, useCallback } from 'react'
import cx from 'classnames'

import styles from 'styles/Dropdown.module.scss'

export interface DropdownProps {
	rootClassName?: string
	triggerClassName?: string
	contentClassName?: string
	trigger: ReactNode
	children: ReactNode
}

const Dropdown = ({ rootClassName, triggerClassName, contentClassName, trigger, children }: DropdownProps) => {
	const [isShowing, setIsShowing] = useState(false)
	
	const show = useCallback(() => {
		setIsShowing(true)
	}, [setIsShowing])
	
	return (
		<div className={cx(styles.root, rootClassName)}>
			<button className={cx(styles.trigger, triggerClassName)} onClick={show}>
				{trigger}
			</button>
			<div className={cx(styles.content, contentClassName)} aria-hidden={!isShowing}>
				{children}
			</div>
		</div>
	)
}

export default Dropdown
