import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import Link from 'next/link'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faDownload, faLink, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import getFileUrl from 'lib/getFileUrl'
import currentFileState from 'state/currentFile'
import useCurrentUser from 'hooks/useCurrentUser'
import useUser from 'hooks/useUser'
import Modal from './Modal'
import FilePreview from './FilePreview'
import Spinner from './Spinner'
import Comments from './Comments'

import styles from 'styles/CurrentFile.module.scss'

const CurrentFile = () => {
	const [file, setFile] = useRecoilState(currentFileState)
	
	const currentUser = useCurrentUser()
	const user = useUser(file?.owner)
	
	const url = file && getFileUrl(file)
	
	const setIsShowing = useCallback((isShowing: boolean) => {
		setFile(file => isShowing ? file : null)
	}, [setFile])
	
	const hide = useCallback(() => {
		setFile(null)
	}, [setFile])
	
	const copyLink = useCallback(() => {
		if (!url)
			return
		
		copy(url)
		toast.success('Copied file to clipboard')
	}, [url])
	
	const deleteFile = useCallback(() => {
		
	}, [])
	
	return (
		<Modal className={styles.root} isShowing={file !== null} setIsShowing={setIsShowing}>
			<header className={styles.header}>
				<p className={styles.headerName}>{file?.name}</p>
				<button className={styles.close} onClick={hide} title="Close">
					<FontAwesomeIcon className={styles.closeIcon} icon={faTimes} />
				</button>
			</header>
			<div className={styles.content}>
				{file && (
					<>
						<FilePreview className={styles.preview} file={file} />
						<div className={styles.main}>
							<div className={styles.info}>
								<div className={styles.meta}>
									<p className={styles.name}>{file.name}</p>
									<p className={styles.user}>
										Uploaded by {user
											? (
												<Link href={`/${user.slug}`}>
													<a className={styles.userLink}>
														<span className={styles.userName}>{user.name}</span>
														<FontAwesomeIcon icon={faChevronRight} />
													</a>
												</Link>
											)
											: <Spinner className={styles.spinner} />
										}
									</p>
								</div>
								<div className={styles.actions}>
									<a
										className={cx(styles.action, styles.download)}
										href={url}
										download={file.name}
										title="Download"
									>
										<FontAwesomeIcon icon={faDownload} />
									</a>
									<button
										className={cx(styles.action, styles.copy)}
										onClick={copyLink}
										title="Copy"
									>
										<FontAwesomeIcon icon={faLink} />
									</button>
									{currentUser && currentUser.uid === user?.id && (
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
					</>
				)}
			</div>
		</Modal>
	)
}

export default CurrentFile
