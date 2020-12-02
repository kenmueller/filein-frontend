import { ReactNode, SetStateAction, useCallback, useEffect, useRef } from 'react'
import cx from 'classnames'

import styles from 'styles/Dropdown.module.scss'

export interface DropdownProps {
	isShowing: boolean
	setIsShowing(isShowing: SetStateAction<boolean>): void
	rootClassName?: string
	triggerClassName?: string
	contentClassName?: string
	trigger: ReactNode
	children: ReactNode
}

const Dropdown = ({ isShowing, setIsShowing, rootClassName, triggerClassName, contentClassName, trigger, children }: DropdownProps) => {
	const triggerRef = useRef<HTMLButtonElement | null>(null)
	const contentRef = useRef<HTMLDivElement | null>(null)
	
	const onClick = useCallback((event: MouseEvent) => {
		const trigger = triggerRef.current
		const content = contentRef.current
		const target = event.target as Node
		
		if (!(trigger && content))
			return
		
		if (trigger === target || trigger.contains(target))
			return setIsShowing(isShowing => !isShowing)
		
		if (content === target || content.contains(target))
			return
		
		setIsShowing(false)
	}, [triggerRef, contentRef, setIsShowing])
	
	useEffect(() => {
		const { body } = document
		
		body.addEventListener('click', onClick)
		return () => body.removeEventListener('click', onClick)
	}, [onClick])
	
	return (
		<div className={cx(styles.root, rootClassName)}>
			<button className={cx(styles.trigger, triggerClassName)} ref={triggerRef}>
				{trigger}
			</button>
			<div className={cx(styles.content, contentClassName)} ref={contentRef} aria-hidden={!isShowing}>
				{children}
			</div>
		</div>
	)
}

export default Dropdown
