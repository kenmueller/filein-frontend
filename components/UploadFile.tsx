import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
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
	const currentUser = useCurrentUser()
	const hideOverlays = useHideOverlays()
	
	const [file, setFile] = useRecoilState(uploadFileState)
	const [fileMeta, setFileMeta] = useState<FileMeta | null>(null)
	const [progress, setProgress] = useState(0)
	
	const isComplete = progress === 100
	const url = fileMeta && getFileUrl(fileMeta)
	
	const setIsShowing = useCallback((isShowing: boolean) => {
		setFile(file => isShowing ? file : null)
	}, [setFile])
	
	const copyLink = useCallback(() => {
		if (!url)
			return
		
		copy(url)
		toast.success('Copied file to clipboard')
	}, [url])
	
	const deleteFile = useCallback(() => {
		if (!fileMeta)
			return
		
		_deleteFile(fileMeta)
			.catch(({ message }) => toast.error(message))
		
		hideOverlays()
	}, [fileMeta, hideOverlays])
	
	useEffect(() => { // Reset
		if (file)
			return
		
		setFileMeta(null)
		setProgress(0)
	}, [file, setFileMeta, setProgress])
	
	useEffect(() => { // Upload
		if (!file || currentUser === undefined)
			return
		
		uploadFile(file, currentUser ? currentUser.uid : null, setProgress)
			.then(setFileMeta)
			.catch(({ message }) => toast.error(message))
	}, [currentUser, file, setFileMeta, setProgress])
	
	useEffect(copyLink, [copyLink])
	
	return (
		<Modal className={styles.root} isShowing={file !== null} setIsShowing={setIsShowing}>
			<header className={styles.header}>
				<p className={styles.headerName}>{fileMeta?.name ?? file?.name}</p>
				<button className={styles.close} onClick={hideOverlays} title="Close">
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
									<EditFileName className={styles.name} file={fileMeta} onEdit={setFileMeta} />
									<div className={styles.actions}>
										<a
											className={cx(styles.action, styles.download)}
											href={url}
											download={fileMeta.name}
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
