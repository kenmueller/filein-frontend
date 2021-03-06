import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import Link from './FooterLink'
import SlackInstallButton from './SlackInstallButton'

import styles from 'styles/Footer.module.scss'

export interface FooterProps {
	className?: string
}

const Footer = ({ className }: FooterProps) => (
	<div className={cx(styles.root, className)}>
		<footer className={styles.content}>
			<Link href="https://github.com/kenmueller/filein-frontend" icon={faGithub}>GitHub</Link>
			<Link href="https://github.com/kenmueller/filein-npm#readme" icon={faCode}>API</Link>
			<p className={styles.copyright}>
				Copyright &copy; 2020 <b>filein</b>. All rights reserved.
			</p>
			<SlackInstallButton className={styles.slack} />
		</footer>
	</div>
)

export default Footer
