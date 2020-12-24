import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import Link from './FooterLink'

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
			<a className={styles.slack} href={process.env.NEXT_PUBLIC_SLACK_INSTALL_URL} rel="noopener noreferrer" target="_blank">
				<img
					src="https://platform.slack-edge.com/img/add_to_slack.png"
					srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
					alt="Add to Slack"
					height={40}
					width={139}
				/>
			</a>
		</footer>
	</div>
)

export default Footer
