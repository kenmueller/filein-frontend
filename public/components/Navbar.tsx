import { MouseEvent } from 'react'
import Link from 'next/link'

import styles from 'styles/Navbar.module.scss'

const stopPropagation = (event: MouseEvent) =>
	event.stopPropagation()

const Navbar = ({ fileCount }: { fileCount: number | null }) => (
	<div className={styles.root}>
		<Link href="/">
			<a className={styles.title} onClick={stopPropagation}>
				Filein
			</a>
		</Link>
		<Link href={fileCount === null ? '/' : '/files'}>
			<a className={styles.action} onClick={stopPropagation}>
				{fileCount === null
					? 'Go Back'
					: `My Files (${fileCount})`
				}
			</a>
		</Link>
	</div>
)

export default Navbar
