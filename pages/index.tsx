import { NextPage } from 'next'

import Head from 'components/Head'
import Gradient from 'components/Gradient'
import RecentlyUploadedFiles from 'components/RecentlyUploadedFiles'
import Footer from 'components/Footer'

import styles from 'styles/Home.module.scss'

const Home: NextPage = () => (
	<div className={styles.root}>
		<Head
			url="https://filein.io"
			image="" // TODO: Add image
			title="filein - The best way to share files"
			description="The best way to share files"
		/>
		<Gradient className={styles.header}>
			<h1 className={styles.title}>
				The best way to share files
			</h1>
			<p className={styles.subtitle}>
				Super fast file hosting. Free forever.
			</p>
			<RecentlyUploadedFiles className={styles.recentlyUploadedFiles} />
		</Gradient>
		<Footer className={styles.footer} />
	</div>
)

export default Home
