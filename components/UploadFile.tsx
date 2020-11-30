import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import uploadFileState from 'state/uploadFile'
import Modal from './Modal'
import ProgressCircle from './ProgressCircle'

import styles from 'styles/UploadFile.module.scss'

const UploadFile = () => {
	const [file, setFile] = useRecoilState(uploadFileState)
	
	const setIsShowing = useCallback((isShowing: boolean) => {
		setFile(file => isShowing ? file : null)
	}, [setFile])
	
	const hide = useCallback(() => {
		setFile(null)
	}, [setFile])
	
	return (
		<Modal
			className={styles.root}
			isShowing={file !== null}
			setIsShowing={setIsShowing}
		>
			<header className={styles.header}>
				<p className={styles.name}>{file?.name}</p>
				<button className={styles.close} onClick={hide}>
					<FontAwesomeIcon className={styles.closeIcon} icon={faTimes} />
				</button>
			</header>
			<div className={styles.progressContainer}>
				<ProgressCircle className={styles.progress} value={20} />
			</div>
		</Modal>
	)
}

export default UploadFile
