import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import uploadFile from 'lib/uploadFile'
import useCurrentUser from 'hooks/useCurrentUser'
import uploadFileState from 'state/uploadFile'
import Modal from './Modal'
import ProgressCircle from './ProgressCircle'

import styles from 'styles/UploadFile.module.scss'
import FilePreview from './FilePreview'
import FileMeta from 'models/FileMeta'

const UploadFile = () => {
	const currentUser = useCurrentUser()
	
	const [file, setFile] = useRecoilState(uploadFileState)
	const [fileMeta, setFileMeta] = useState<FileMeta | null>(null)
	const [progress, setProgress] = useState(0)
	
	const setIsShowing = useCallback((isShowing: boolean) => {
		setFile(file => isShowing ? file : null)
	}, [setFile])
	
	const hide = useCallback(() => {
		setFile(null)
	}, [setFile])
	
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
	
	return (
		<Modal className={styles.root} isShowing={file !== null} setIsShowing={setIsShowing}>
			<header className={styles.header}>
				<p className={styles.name}>{file?.name}</p>
				<button className={styles.close} onClick={hide} title="Close">
					<FontAwesomeIcon className={styles.closeIcon} icon={faTimes} />
				</button>
			</header>
			<div className={styles.content}>
				<ProgressCircle
					className={styles.progress}
					value={progress}
					aria-hidden={progress === 100}
				/>
				<div className={styles.summary} aria-hidden={progress !== 100}>
					{fileMeta && <FilePreview file={fileMeta} />}
				</div>
			</div>
		</Modal>
	)
}

export default UploadFile
