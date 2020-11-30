import Head from 'next/head'

import Gradient from './Gradient'
import Footer from './Footer'

import styles from 'styles/NotFound.module.scss'

const NotFound = () => (
	<div className={styles.root}>
		<Head>
			<title key="title">404 - filein</title>
		</Head>
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
