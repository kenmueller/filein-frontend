import { NextPage, GetStaticProps } from 'next'

import FileMeta from 'models/FileMeta'
import getRecentlyUploadedFiles from 'lib/getRecentlyUploadedFiles'
import { REVALIDATE } from 'lib/constants'
import Head from 'components/Head'
import Gradient from 'components/Gradient'
import RecentlyUploadedFiles from 'components/RecentlyUploadedFiles'
import Footer from 'components/Footer'

import styles from 'styles/Home.module.scss'

interface HomeProps {
	files: FileMeta[]
}

const Home: NextPage<HomeProps> = ({ files }) => (
	<div className={styles.root}>
		<Head
			url="https://filein.io"
			title="filein - The best way to share files"
			description="The best way to share files"
		/>
		<Gradient className={styles.header}>
			<h1 className={styles.title}>
				The best way to share files
			</h1>
			<p className={styles.subtitle}>
				Super fast file hosting. Free forever. Upload public or private files.
			</p>
			<RecentlyUploadedFiles
				className={styles.recentlyUploadedFiles}
				files={files}
			/>
		</Gradient>
		<Footer className={styles.footer} />
	</div>
)

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
	props: { files: await getRecentlyUploadedFiles() },
	revalidate: REVALIDATE
})

export default Home
