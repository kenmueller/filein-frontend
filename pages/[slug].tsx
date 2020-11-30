import { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import User from 'models/User'
import FileMeta from 'models/FileMeta'
import getUserFromSlug from 'lib/getUserFromSlug'
import getFiles from 'lib/getFiles'
import getFilePredicate from 'lib/getFilePredicate'
import useFiles from 'hooks/useFiles'
import NotFound from 'components/NotFound'
import Gradient from 'components/Gradient'
import Search from 'components/Search'
import FileGrid from 'components/FileGrid'
import FileCell from 'components/FileCell'
import Footer from 'components/Footer'

import styles from 'styles/UserPage.module.scss'

interface UserPageProps {
	user: User | null
	files: FileMeta[] | null
}

const UserPage: NextPage<UserPageProps> = ({ user, files: _files }) => {
	if (!user)
		return <NotFound />
	
	const files = useFiles(user.id) ?? _files
	const [query, setQuery] = useState('')
	
	return (
		<div className={styles.root}>
			<Head>
				<title key="title">filein</title>
			</Head>
			<Gradient>
				<header className={styles.header}>
					<h1 className={styles.name}>{user.name}</h1>
					<Search
						className={styles.search}
						placeholder="Files"
						value={query}
						setValue={setQuery}
					/>
				</header>
				<FileGrid className={styles.files} loading={!files}>
					{files?.filter(getFilePredicate(query)).map(file => (
						<FileCell key={file.id} file={file} />
					))}
				</FileGrid>
			</Gradient>
			<Footer className={styles.footer} />
		</div>
	)
}

UserPage.getInitialProps = async ({ query, res }) => {
	const user = await getUserFromSlug(query.slug as string)
	
	if (!user && res)
		res.statusCode = 404
	
	return {
		user,
		files: user && res ? await getFiles(user.id) : null
	}
}

export default UserPage
