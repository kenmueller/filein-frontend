import { ReactNode, useRef, useCallback, useEffect } from 'react'
import cx from 'classnames'

import styles from 'styles/Modal.module.scss'

export interface ModalProps {
	className?: string
	isShowing: boolean
	setIsShowing(isShowing: boolean): void
	children?: ReactNode
}

const Modal = ({ className, isShowing, setIsShowing, children }: ModalProps) => {
	const root = useRef<HTMLDivElement | null>(null)
	const content = useRef<HTMLDivElement | null>(null)
	
	const onClick = useCallback(({ target }: MouseEvent) => {
		const { current } = content
		
		if (current && !(target === current || current.contains(target as Node)))
			setIsShowing(false)
	}, [content, setIsShowing])
	
	useEffect(() => {
		const { current } = root
		
		if (!current)
			return
		
		current.addEventListener('click', onClick)
		return () => current.removeEventListener('click', onClick)
	}, [root, onClick])
	
	return (
		<div
			className={styles.root}
			ref={root}
			role="presentation"
			aria-hidden={!isShowing}
		>
			<div className={cx(styles.content, className)} ref={content}>
				{children}
			</div>
		</div>
	)
}

export default Modal
