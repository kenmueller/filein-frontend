import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Head from 'components/Head'
import Gradient from 'components/Gradient'
import Footer from 'components/Footer'

import styles from 'styles/NotFound.module.scss'

const NotFound: NextPage = () => (
	<div className={styles.root}>
		<Head
			url={`https://filein.io${useRouter().asPath}`}
			image="" // TODO: Add image
			title="404 - filein"
			description="Oh no! Are you lost?"
		/>
		<Gradient className={styles.header}>
			<h1 className={styles.title}>404</h1>
			<p className={styles.subtitle}>
				Oh no! Are you lost?
			</p>
		</Gradient>
		<Footer className={styles.footer} />
	</div>
)

export default NotFound
