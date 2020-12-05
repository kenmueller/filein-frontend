import { useState, useCallback, useEffect } from 'react'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Router from 'next/router'
import { useSetRecoilState } from 'recoil'
import Link from 'next/link'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faDownload, faLink, faTrash } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import User from 'models/User'
import FileMeta from 'models/FileMeta'
import getFileIds from 'lib/getFileIds'
import getUser from 'lib/getUser'
import getFile from 'lib/getFile'
import getFileUrl from 'lib/getFileUrl'
import _deleteFile from 'lib/deleteFile'
import { REVALIDATE } from 'lib/constants'
import usersState from 'state/users'
import useCurrentUser from 'hooks/useCurrentUser'
import Head from 'components/Head'
import Gradient from 'components/Gradient'
import FilePreview from 'components/FilePreview'
import EditFileName from 'components/EditFileName'
import AccessToggle from 'components/AccessToggle'
import Comments from 'components/Comments'
import Footer from 'components/Footer'

import styles from 'styles/FilePage.module.scss'

interface FilePageProps {
	file: FileMeta
	owner: User | null
}

const FilePage: NextPage<FilePageProps> = ({ file: _file, owner }) => {
	const setUsers = useSetRecoilState(usersState)
	const [file, setFile] = useState(_file)
	
	const currentUser = useCurrentUser()
	
	const url = getFileUrl(file)
	const isOwner = currentUser?.auth
		? currentUser.auth.uid === file.owner
		: false
	
	const download = useCallback(() => {
		saveAs(getFileUrl(file, true), file.name)
	}, [file])
	
	const copyLink = useCallback(() => {
		if (!url)
			return
		
		copy(url)
		toast.success('Copied file to clipboard')
	}, [url])
	
	const deleteFile = useCallback(() => {
		if (!window.confirm('Are you sure? You cannot restore a deleted file.'))
			return
		
		_deleteFile(file)
			.catch(({ message }) => toast.error(message))
		
		Router.push('/')
	}, [file])
	
	useEffect(() => {
		if (owner)
			setUsers(users => ({
				...users,
				[owner.id]: users[owner.id] ?? owner
			}))
	}, [owner, setUsers])
	
	return (
		<div className={styles.root}>
			<Head
				url={`https://filein.io/${file.id}`}
				image={url}
				title={`${file.name} - filein`}
				description={`View ${file.name} by ${owner?.name ?? 'anonymous'}`}
			/>
			<Gradient className={styles.header}>
				<FilePreview className={styles.preview} file={file} />
				<div className={styles.main}>
					<div className={styles.info}>
						<div className={styles.meta}>
							{isOwner
								? <EditFileName className={styles.editName} file={file} onEdit={setFile} />
								: <h1 className={styles.name}>{file.name}</h1>
							}
							<p className={styles.user}>
								Uploaded by {owner
									? (
										<Link href={`/u/${owner.slug}`}>
											<a className={styles.userLink}>
												<span className={styles.userName}>{owner.name}</span>
												<FontAwesomeIcon
													className={styles.userIcon}
													icon={faChevronRight}
												/>
											</a>
										</Link>
									)
									: <span className={styles.userName}>anonymous</span>
								}
							</p>
						</div>
						<div className={styles.options}>
							<div className={styles.actions}>
								<button
									className={cx(styles.action, styles.download)}
									onClick={download}
									title="Download"
								>
									<FontAwesomeIcon icon={faDownload} />
								</button>
								<button
									className={cx(styles.action, styles.copy)}
									onClick={copyLink}
									title="Copy source"
								>
									<FontAwesomeIcon icon={faLink} />
								</button>
								{isOwner && (
									<button
										className={cx(styles.action, styles.delete)}
										onClick={deleteFile}
										title="Delete"
									>
										<FontAwesomeIcon icon={faTrash} />
									</button>
								)}
							</div>
							{(isOwner || !file.public) && (
								<AccessToggle
									className={styles.accessToggle}
									file={file}
									disabledMessage={isOwner ? undefined : null}
									leftIndicator
								/>
							)}
						</div>
					</div>
					<Comments className={styles.comments} file={file} />
				</div>
			</Gradient>
			<Footer className={styles.footer} />
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: (await getFileIds()).map(id => ({
		params: { id }
	})),
	fallback: 'blocking'
})

export const getStaticProps: GetStaticProps<FilePageProps> = async ({ params }) => {
	const file = await getFile(params.id as string)
	
	if (!file)
		return { notFound: true }
	
	return {
		props: { file, owner: file.owner && await getUser(file.owner) },
		revalidate: REVALIDATE
	}
}

export default FilePage
