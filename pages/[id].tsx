import { useState, useCallback, useEffect } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import { useSetRecoilState } from 'recoil'
import Head from 'next/head'
import Link from 'next/link'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faDownload, faLink, faTrash } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import User from 'models/User'
import FileMeta from 'models/FileMeta'
import getUser from 'lib/getUser'
import getFile from 'lib/getFile'
import getFileUrl from 'lib/getFileUrl'
import _deleteFile from 'lib/deleteFile'
import usersState from 'state/users'
import useCurrentUser from 'hooks/useCurrentUser'
import useUser from 'hooks/useUser'
import NotFound from 'components/NotFound'
import Gradient from 'components/Gradient'
import FilePreview from 'components/FilePreview'
import EditFileName from 'components/EditFileName'
import Spinner from 'components/Spinner'
import Comments from 'components/Comments'
import Footer from 'components/Footer'

import styles from 'styles/FilePage.module.scss'

interface FilePageProps {
	file: FileMeta | null
	owner: User | null
}

const FilePage: NextPage<FilePageProps> = ({ file: _file, owner: _owner }) => {
	if (!_file)
		return <NotFound />
	
	const setUsers = useSetRecoilState(usersState)
	const [file, setFile] = useState(_file)
	
	const currentUser = useCurrentUser()
	const user = _owner ?? useUser(file.owner)
	
	const url = file && getFileUrl(file)
	const isOwner = currentUser?.auth
		? currentUser.auth.uid === file.owner
		: false
	
	const download = useCallback(() => {
		if (file && url)
			saveAs(url, file.name)
	}, [file, url])
	
	const copyLink = useCallback(() => {
		if (!url)
			return
		
		copy(url)
		toast.success('Copied file to clipboard')
	}, [url])
	
	const deleteFile = useCallback(() => {
		if (!(file && window.confirm('Are you sure? You cannot restore a deleted file.')))
			return
		
		_deleteFile(file)
			.catch(({ message }) => toast.error(message))
		
		Router.push('/')
	}, [file])
	
	useEffect(() => {
		if (_owner)
			setUsers(users => ({ ...users, [_owner.id]: _owner }))
	}, [_owner, setUsers])
	
	return (
		<div className={styles.root}>
			<Head>
				<title key="title">{file.name} - filein</title>
			</Head>
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
								Uploaded by {file.owner
									? user
										? (
											<Link href={`/u/${user.slug}`}>
												<a className={styles.userLink}>
													<span className={styles.userName}>{user.name}</span>
													<FontAwesomeIcon
														className={styles.userIcon}
														icon={faChevronRight}
													/>
												</a>
											</Link>
										)
										: <Spinner className={styles.spinner} />
									: <span className={styles.userName}>anonymous</span>
								}
							</p>
						</div>
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
								title="Copy"
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
					</div>
					<Comments className={styles.comments} file={file} />
				</div>
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
