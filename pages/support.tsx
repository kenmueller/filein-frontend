import { NextPage } from 'next'

import Head from 'components/Head'
import Gradient from 'components/Gradient'
import Footer from 'components/Footer'

import styles from 'styles/Support.module.scss'

const SUPPORT_EMAIL = 'kenmueller0@gmail.com'

const Support: NextPage = () => (
	<div className={styles.root}>
		<Head
			url="https://filein.io/support"
			title="Support - filein"
			description="Contact filein's support team"
			storagePreconnect={false}
		/>
		<Gradient className={styles.header}>
			<h1 className={styles.title}>Support</h1>
			<p className={styles.subtitle}>
				Email us at <a
					className={styles.email}
					href={`mailto:${SUPPORT_EMAIL}`}
					rel="noopener noreferrer"
					target="_blank"
				>
					{SUPPORT_EMAIL}
				</a> or use the live chat on the bottom right of the page.
			</p>
		</Gradient>
		<Footer className={styles.footer} />
	</div>
)

export default Support
