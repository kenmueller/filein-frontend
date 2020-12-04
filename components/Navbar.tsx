import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import ProgressBar from 'nextjs-progressbar'
import { Svg } from 'react-optimized-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import UploadButton from './UploadButton'
import AuthButton from './AuthButton'

import icon from 'images/icon.svg'

import styles from 'styles/Navbar.module.scss'

const Navbar = () => {
	const [isActive, setIsActive] = useState(false)
	
	const onScroll = useCallback(() => {
		setIsActive(document.documentElement.scrollTop > 0)
	}, [setIsActive])
	
	useEffect(() => {
		onScroll()
		window.addEventListener('scroll', onScroll)
		
		return () => window.removeEventListener('scroll', onScroll)
	}, [onScroll])
	
	return (
		<div className={cx(styles.root, { [styles.active]: isActive })}>
			<ProgressBar color={isActive ? '#08f' : 'white'} />
			<nav className={styles.content}>
				<Link href="/">
					<a className={styles.home}>
						<Svg className={styles.homeIcon} src={icon} />
						<span className={styles.homeMessage}>filein</span>
					</a>
				</Link>
				<UploadButton className={styles.upload}>
					<FontAwesomeIcon icon={faUpload} />
					<p className={styles.uploadMessage}>Drag anywhere</p>
				</UploadButton>
				<AuthButton className={styles.auth} />
			</nav>
		</div>
	)
}

export default Navbar
