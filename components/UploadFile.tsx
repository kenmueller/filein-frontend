import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { saveAs } from 'file-saver'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faLink, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import FileMeta from 'models/FileMeta'
import uploadFile from 'lib/uploadFile'
import _deleteFile from 'lib/deleteFile'
import getFileUrl from 'lib/getFileUrl'
import uploadFileState from 'state/uploadFile'
import useCurrentUser from 'hooks/useCurrentUser'
import useHideOverlays from 'hooks/useHideOverlays'
import Modal from './Modal'
import ProgressCircle from './ProgressCircle'
import FilePreview from './FilePreview'
import EditFileName from './EditFileName'
import Comments from './Comments'

import styles from 'styles/UploadFile.module.scss'

const UploadFile = () => {
	const path = useRouter().asPath
	const currentUser = useCurrentUser()
	const hideOverlays = useHideOverlays()
	
	const file = useRecoilValue(uploadFileState)
	const [fileMeta, setFileMeta] = useState<FileMeta | null>(null)
	const [progress, setProgress] = useState(0)
	
	const isComplete = progress === 100
	const uid = currentUser && currentUser.auth?.uid
	const id = fileMeta?.id
	const url = fileMeta && getFileUrl(fileMeta)
	const name = fileMeta?.name ?? file?.name
	
	const hide = useCallback(() => {
		hideOverlays()
		history.replaceState({}, '', path)
	}, [path, hideOverlays])
	
	const setIsShowing = useCallback((isShowing: boolean) => {
		if (!isShowing)
			hide()
	}, [hide])
	
	const download = useCallback(() => {
		if (file && fileMeta)
			saveAs(file, fileMeta.name)
	}, [file, fileMeta])
	
	const copyLink = useCallback(() => {
		if (!url)
			return
		
		copy(url)
		toast.success('Copied file to clipboard')
	}, [url])
	
	const deleteFile = useCallback(() => {
		if (!(fileMeta && window.confirm('Are you sure? You cannot restore a deleted file.')))
			return
		
		_deleteFile(fileMeta)
			.catch(({ message }) => toast.error(message))
		
		hide()
	}, [fileMeta, hide])
	
	useEffect(() => { // Reset
		if (file)
			return
		
		setFileMeta(null)
		setProgress(0)
	}, [file, setFileMeta, setProgress])
	
	useEffect(() => { // Upload
		if (!file || uid === undefined)
			return
		
		uploadFile(file, uid, setProgress)
			.then(setFileMeta)
			.catch(({ message }) => toast.error(message))
	}, [uid, file, setFileMeta, setProgress])
	
	useEffect(() => {
		if (id)
			history.replaceState({}, '', `/${id}`)
	}, [id])
	
	useEffect(copyLink, [copyLink])
	
	return (
		<Modal className={styles.root} isShowing={file !== null} setIsShowing={setIsShowing}>
			<Head>
				{name && <title key="title">{name} - filein</title>}
			</Head>
			<header className={styles.header}>
				<p className={styles.headerName}>{name}</p>
				<button className={styles.close} onClick={hide} title="Close">
					<FontAwesomeIcon className={styles.closeIcon} icon={faTimes} />
				</button>
			</header>
			<div className={styles.content}>
				<ProgressCircle
					className={styles.progress}
					value={progress}
					aria-hidden={isComplete}
				/>
				<div className={styles.summary} aria-hidden={!isComplete}>
					{fileMeta && (
						<>
							<FilePreview className={styles.preview} file={fileMeta} />
							<div className={styles.main}>
								<div className={styles.info}>
									{currentUser
										? <EditFileName className={styles.editName} file={fileMeta} onEdit={setFileMeta} />
										: <p className={styles.name}>{fileMeta.name}</p>
									}
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
										<button
											className={cx(styles.action, styles.delete)}
											onClick={deleteFile}
											title="Delete"
										>
											<FontAwesomeIcon icon={faTrash} />
										</button>
									</div>
								</div>
								<Comments className={styles.comments} file={fileMeta} />
							</div>
						</>
					)}
				</div>
			</div>
		</Modal>
	)
}

export default UploadFile
