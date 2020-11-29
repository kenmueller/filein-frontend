import cx from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import styles from 'styles/Footer.module.scss'

export interface FooterProps {
	className?: string
}

const Footer = ({ className }: FooterProps) => (
	<div className={cx(styles.root, className)}>
		<footer className={styles.content}>
			<a
				className={styles.link}
				href="https://github.com/kenmueller/filein"
				rel="noopener noreferrer"
				target="_blank"
			>
				<FontAwesomeIcon className={styles.icon} icon={faGithub} />
			</a>
			<p className={styles.copyright}>
				Copyright &copy; 2020 <b>filein</b>. All rights reserved.
			</p>
		</footer>
	</div>
)

export default Footer
