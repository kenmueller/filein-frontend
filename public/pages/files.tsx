import { NextPage } from 'next'
import Head from 'next/head'

import useFiles from 'hooks/useFiles'
import Navbar from 'components/Navbar'
import FileList from 'components/FileList'

import styles from 'styles/files.module.scss'

const Files: NextPage = () => {
	const [files, setFiles] = useFiles()
	
	return (
		<div className={styles.root}>
			<Head>
				<meta
					key="description"
					name="description"
					content="My files on Filein"
				/>
				<title key="title">
					My Files | Filein
				</title>
			</Head>
			<Navbar className={styles.navbar} fixed fileCount={null} />
			<div className={styles.content}>
				<h1 className={styles.title}>
					My Files ({files.length})
				</h1>
				<FileList
					className={styles.files}
					files={files}
					setFiles={setFiles}
				/>
			</div>
		</div>
	)
}

export default Files
