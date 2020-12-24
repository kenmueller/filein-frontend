import { NextPage } from 'next'

import Head from 'components/Head'
import Gradient from 'components/Gradient'
import Document from 'docs/privacy.mdx'
import Footer from 'components/Footer'

import styles from 'styles/Privacy.module.scss'

const Privacy: NextPage = () => (
	<div className={styles.root}>
		<Head
			url="https://filein.io/privacy"
			title="Privacy - filein"
			description="View filein's privacy policy"
			storagePreconnect={false}
		/>
		<Gradient className={styles.header}>
			<h1 className={styles.title}>Privacy</h1>
			<article className={styles.document}>
				<Document />
			</article>
		</Gradient>
		<Footer className={styles.footer} />
	</div>
)

export default Privacy
