import { ChangeEvent, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import FileMeta from 'models/FileMeta'
import editAccess from 'lib/editAccess'
import useUpdate from 'hooks/useUpdate'

import styles from 'styles/AccessToggle.module.scss'

export interface AccessToggleProps {
	className?: string
	file: FileMeta
	disabledMessage?: string
	leftIndicator?: boolean
}

const AccessToggle = ({ className, file, disabledMessage, leftIndicator = false }: AccessToggleProps) => {
	const update = useUpdate()
	const isPublic = file.public
	
	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		editAccess(file, event.target.checked)
		update()
	}, [file, update])
	
	return (
		<label
			className={className}
			aria-label={disabledMessage}
			data-balloon-pos={disabledMessage ? 'right' : undefined}
		>
			<input
				className={styles.input}
				disabled={Boolean(disabledMessage)}
				type="checkbox"
				checked={isPublic}
				onChange={onChange}
			/>
			<span className={cx(styles.icon, {
				[styles.public]: isPublic,
				[styles.leftIndicator]: leftIndicator
			})}>
				<FontAwesomeIcon icon={isPublic ? faEye : faEyeSlash} />
			</span>
		</label>
	)
}

export default AccessToggle
