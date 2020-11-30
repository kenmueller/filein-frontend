import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

import clipBody from 'lib/clipBody'

import styles from 'styles/UploadDropOverlay.module.scss'

export interface UploadDropOverlayProps {
	active: boolean
}

const UploadDropOverlay = ({ active }: UploadDropOverlayProps) => {
	useEffect(() => {
		clipBody(active)
	}, [active])
	
	return (
		<div className={styles.root} role="presentation" aria-hidden={!active}>
			<FontAwesomeIcon icon={faUpload} />
			<p className={styles.message}>Drop file</p>
		</div>
	)
}

export default UploadDropOverlay
