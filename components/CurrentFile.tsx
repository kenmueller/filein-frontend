import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import currentFileState from 'state/currentFile'
import Modal from './Modal'

import styles from 'styles/CurrentFile.module.scss'
import FilePreview from './FilePreview'

const CurrentFile = () => {
	const [file, setFile] = useRecoilState(currentFileState)
	
	const setIsShowing = useCallback((isShowing: boolean) => {
		setFile(file => isShowing ? file : null)
	}, [setFile])
	
	const hide = useCallback(() => {
		setFile(null)
	}, [setFile])
	
	useEffect(() => {
		
	}, [])
	
	return (
		<Modal className={styles.root} isShowing={file !== null} setIsShowing={setIsShowing}>
			<header className={styles.header}>
				<p className={styles.name}>{file?.name}</p>
				<button className={styles.close} onClick={hide}>
					<FontAwesomeIcon className={styles.closeIcon} icon={faTimes} />
				</button>
			</header>
			<div className={styles.content}>
				{file && <FilePreview file={file} />}
			</div>
		</Modal>
	)
}

export default CurrentFile
