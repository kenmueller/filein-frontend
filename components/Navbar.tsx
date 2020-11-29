import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import cx from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

import styles from 'styles/Navbar.module.scss'

const Navbar = () => {
	const [isActive, setIsActive] = useState(false)
	
	const onScroll = useCallback(() => {
		setIsActive(document.documentElement.scrollTop > 0)
	}, [setIsActive])
	
	useEffect(() => {
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [onScroll])
	
	return (
		<div className={cx(styles.root, { [styles.active]: isActive })}>
			<nav className={styles.content}>
				<Link href="/">
					<a className={styles.home}>filein</a>
				</Link>
				<button className={styles.upload}>
					<FontAwesomeIcon className={styles.uploadIcon} icon={faUpload} />
					<p className={styles.uploadMessage}>Drag anywhere</p>
				</button>
			</nav>
		</div>
	)
}

export default Navbar
