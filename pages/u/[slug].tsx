import { useCallback, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import User from 'models/User'
import FileMeta from 'models/FileMeta'
import getUserSlugs from 'lib/getUserSlugs'
import getUserFromSlug from 'lib/getUserFromSlug'
import getFiles from 'lib/getFiles'
import getFilePredicate from 'lib/getFilePredicate'
import { REVALIDATE } from 'lib/constants'
import usersState from 'state/users'
import useFiles from 'hooks/useFiles'
import Head from 'components/Head'
import Gradient from 'components/Gradient'
import Search from 'components/Search'
import FileGrid from 'components/FileGrid'
import FileCell from 'components/FileCell'
import Footer from 'components/Footer'

import styles from 'styles/UserPage.module.scss'

interface UserPageProps {
	user: User
	files: FileMeta[]
}

const UserPage: NextPage<UserPageProps> = ({ user, files: _files }) => {
	const setUsers = useSetRecoilState(usersState)
	
	const router = useRouter()
	const files = useFiles(user.id) ?? _files
	const query = (router.query.q ?? '') as string
	
	const setQuery = useCallback((query: string) => {
		router.replace(
			`/${user.slug}${query ? `?q=${encodeURIComponent(query)}` : ''}`,
			undefined,
			{ shallow: true }
		)
	}, [user.slug, router])
	
	useEffect(() => {
		setUsers(users => ({ ...users, [user.id]: user }))
	}, [user, setUsers])
	
	return (
		<div className={styles.root}>
			<Head
				url={`https://filein.io/u/${user.slug}`}
				title={`${user.name} - filein`}
				description={`View ${user.name}'s ${user.files} file${user.files === 1 ? '' : 's'}`}
			/>
			<Gradient className={styles.header}>
				<h1 className={styles.name}>{user.name}</h1>
				<p className={styles.filesCount}>
					{user.files} file{user.files === 1 ? '' : 's'}
				</p>
				<div className={styles.filesContainer}>
					<Search placeholder="Files" value={query} setValue={setQuery} />
					<FileGrid className={styles.files}>
						{files?.filter(getFilePredicate(query)).map(file => (
							<FileCell key={file.id} file={file} />
						))}
					</FileGrid>
				</div>
			</Gradient>
			<Footer className={styles.footer} />
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: (await getUserSlugs()).map(slug => ({
		params: { slug }
	})),
	fallback: 'blocking'
})

export const getStaticProps: GetStaticProps<UserPageProps> = async ({ params }) => {
	const user = await getUserFromSlug(params.slug as string)
	
	if (!user)
		return { notFound: true }
	
	return {
		props: { user, files: await getFiles(user.id) },
		revalidate: REVALIDATE
	}
}

export default UserPage
