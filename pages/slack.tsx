import { NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlack } from '@fortawesome/free-brands-svg-icons'

import Head from 'components/Head'
import Gradient from 'components/Gradient'
import Footer from 'components/Footer'

import styles from 'styles/Slack.module.scss'
import SlackInstallButton from 'components/SlackInstallButton'

const Slack: NextPage = () => (
	<div className={styles.root}>
		<Head
			url="https://filein.io/slack"
			title="Slack - filein"
			description="Add filein to your Slack workspace"
			storagePreconnect={false}
		/>
		<Gradient className={styles.header}>
			<FontAwesomeIcon className={styles.titleIcon} icon={faSlack} />
			<h1 className={styles.title}>
				Slack + filein
			</h1>
			<p className={styles.subtitle}>
				Upload files without leaving your workspace
			</p>
			<SlackInstallButton className={styles.install} />
		</Gradient>
		<Footer className={styles.footer} />
	</div>
)

export default Slack
