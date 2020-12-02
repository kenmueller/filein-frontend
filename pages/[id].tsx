import { NextPage } from 'next'
import Head from 'next/head'

import User from 'models/User'
import FileMeta from 'models/FileMeta'
import getUser from 'lib/getUser'
import getFile from 'lib/getFile'
import NotFound from 'components/NotFound'
import Gradient from 'components/Gradient'
import Footer from 'components/Footer'

import styles from 'styles/FilePage.module.scss'

interface FilePageProps {
	file: FileMeta | null
	owner: User | null
}

const FilePage: NextPage<FilePageProps> = ({ file, owner }) => {
	if (!file)
		return <NotFound />
	
	return (
		<div className={styles.root}>
			<Head>
				<title key="title">{file.name} - filein</title>
			</Head>
			<Gradient className={styles.header}>
				
			</Gradient>
			<Footer className={styles.footer} />
		</div>
	)
}

FilePage.getInitialProps = async ({ query, res }) => {
	const file = await getFile(query.id as string)
	
	if (!file && res)
		res.statusCode = 404
	
	return {
		file,
		owner: file?.owner && res ? await getUser(file.owner) : null
	}
}

export default FilePage
