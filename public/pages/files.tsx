import Head from 'next/head'

import useFileCount from 'hooks/useFileCount'
import Navbar from 'components/Navbar'
import FileList from 'components/FileList'

import styles from 'styles/files.module.scss'

const Files = () => {
	const [fileCount, setFileCount] = useFileCount()
	
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
				<Navbar fileCount={null} />
				<div className={styles.content}>
					<h1 className={styles.title}>
						My Files ({fileCount})
					</h1>
					<FileList />
				</div>
			</div>
		</>
	)
}

export default Files
