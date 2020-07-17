import Head from 'next/head'
import { ToastContainer } from 'react-toastify'

import useFiles from 'hooks/useFiles'
import Navbar from 'components/Navbar'
import FileList from 'components/FileList'

import styles from 'styles/files.module.scss'

const Files = () => {
	const [files, setFiles] = useFiles()
	
	return (
		<>
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
			<div className={styles.root}>
				<Navbar className={styles.navbar} fixed fileCount={null} />
				<div className={styles.content}>
					<h1 className={styles.title}>
						My Files ({files.length})
					</h1>
					<FileList files={files} setFiles={setFiles} />
				</div>
			</div>
			<ToastContainer className="toast" />
		</>
	)
}

export default Files
