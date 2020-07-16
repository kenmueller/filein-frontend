import { MouseEvent } from 'react'
import Link from 'next/link'

import styles from 'styles/Navbar.module.scss'

const stopPropagation = (event: MouseEvent) =>
	event.stopPropagation()

const Navbar = ({ fileCount }: { fileCount: number }) => (
	<div className={styles.root}>
		<h1 className={styles.title}>
			Filein
		</h1>
		<Link href="/files">
			<a className={styles.files} onClick={stopPropagation}>
				My Files ({fileCount})
			</a>
		</Link>
	</div>
)

export default Navbar
