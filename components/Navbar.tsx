import { MouseEvent } from 'react'
import Link from 'next/link'
import cx from 'classnames'

import styles from 'styles/Navbar.module.scss'

export interface NavbarProps {
	className?: string
	fixed?: boolean
	fileCount: number | null
}

const stopPropagation = (event: MouseEvent) =>
	event.stopPropagation()

const Navbar = ({ className, fixed = false, fileCount }: NavbarProps) => (
	<div className={cx(styles.root, className, {
		[styles.fixed]: fixed
	})}>
		<Link href="/">
			<a className={styles.title} onClick={stopPropagation}>
				Filein
			</a>
		</Link>
		<Link href={fileCount === null ? '/' : '/files'}>
			<a className={styles.action} onClick={stopPropagation}>
				{fileCount === null
					? 'Upload'
					: `My Files (${fileCount})`
				}
			</a>
		</Link>
	</div>
)

export default Navbar
