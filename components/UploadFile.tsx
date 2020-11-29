import { useCallback } from 'react'
import { useRecoilState } from 'recoil'

import uploadFileState from 'state/uploadFile'
import Modal from './Modal'

import styles from 'styles/UploadFile.module.scss'

const UploadFile = () => {
	const [file, setFile] = useRecoilState(uploadFileState)
	
	const setIsShowing = useCallback((isShowing: boolean) => {
		setFile(file => isShowing ? file : null)
	}, [setFile])
	
	return (
		<Modal
			className={styles.root}
			isShowing={file !== null}
			setIsShowing={setIsShowing}
		>
			Uploading...
		</Modal>
	)
}

export default UploadFile
