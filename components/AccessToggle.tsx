import { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'

import FileMeta from 'models/FileMeta'
import editAccess from 'lib/editAccess'

import styles from 'styles/AccessToggle.module.scss'

export interface AccessToggleProps {
	file: FileMeta
}

const AccessToggle = ({ file }: AccessToggleProps) => {
	const [isPublic, setIsPublic] = useState(file.public)
	
	const _setPublic = useCallback(() => setIsPublic(true), [setIsPublic])
	const _setPrivate = useCallback(() => setIsPublic(false), [setIsPublic])
	
	const setPublic = useCallback(() => {
		editAccess(file, true)
		_setPublic()
	}, [file, _setPublic])
	
	const setPrivate = useCallback(() => {
		editAccess(file, false)
		_setPrivate()
	}, [file, _setPrivate])
	
	const reset = useCallback(() => {
		setIsPublic(file.public)
	}, [file.public, setIsPublic])
	
	return (
		<div className={styles.root}>
			<FontAwesomeIcon className={styles.icon} icon={isPublic ? faLockOpen : faLock} />
			<button
				className={styles.button}
				disabled={file.public}
				onClick={setPublic}
				onMouseEnter={_setPublic}
				onMouseLeave={reset}
			>
				Public
			</button>
			<button
				className={styles.button}
				disabled={!file.public}
				onClick={setPrivate}
				onMouseEnter={_setPrivate}
				onMouseLeave={reset}
			>
				Private
			</button>
		</div>
	)
}

export default AccessToggle
