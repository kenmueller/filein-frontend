import cx from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import styles from 'styles/Footer.module.scss'

export interface FooterProps {
	className?: string
}

const Footer = ({ className }: FooterProps) => (
	<footer className={cx(styles.root, className)}>
		<a href="https://github.com/kenmueller/filein" rel="noopener noreferrer" target="_blank">
			<FontAwesomeIcon icon={faGithub} />
		</a>
		<p className={styles.copyright}>
			Copyright &copy; 2020 filein Inc. All rights reserved.
		</p>
	</footer>
)

export default Footer
