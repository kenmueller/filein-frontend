import { SetStateAction, useState, useCallback, ChangeEvent, FormEvent, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faDownload, faLink } from '@fortawesome/free-solid-svg-icons'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'
import cx from 'classnames'

import deleteFileFromStorage from 'lib/deleteFile'
import { File } from 'hooks/useFiles'

import styles from 'styles/FileRow.module.scss'

export interface FileRowProps {
	file: File
	setFiles(files: SetStateAction<File[]>): void
}

const FileRow = ({ file, setFiles }: FileRowProps) => {
	const nameInput = useRef<HTMLInputElement | null>(null)
	const [name, setName] = useState(file.name)
	
	const onNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value)
	}, [setName])
	
	const onNameSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		if (!name)
			return
		
		setFiles(files =>
			files.map(_file => ({
				..._file,
				name: _file.id === file.id ? name : _file.name
			}))
		)
		
		nameInput.current.blur()
	}, [setFiles, file.id, name])
	
	const copyUrl = useCallback(() => {
		copy(file.url)
		toast.success('Copied URL to clipboard')
	}, [file.url])
	
	const deleteFile = useCallback(() => {
		deleteFileFromStorage(file.id)
		
		setFiles(files =>
			files.filter(({ id }) => id !== file.id)
		)
		
		toast.success('Deleted file')
	}, [setFiles, file.id])
	
	return (
		<div className={styles.root}>
			<a
				href={file.url}
				className={cx(styles.icon, {
					[styles.noImage]: !file.image
				})}
				style={
					file.image
						? { backgroundImage: `url(${file.url})` }
						: undefined
				}
			/>
			<form className={styles.name} onSubmit={onNameSubmit}>
				<input
					ref={nameInput}
					className={styles.nameInput}
					value={name}
					onChange={onNameChange}
				/>
			</form>
			<button
				className={cx(styles.action, styles.copyUrlButton)}
				onClick={copyUrl}
			>
				<FontAwesomeIcon icon={faLink} />
			</button>
			<a
				className={cx(styles.action, styles.downloadButton)}
				href={`/download/${file.id}`}
				download={file.name}
			>
				<FontAwesomeIcon icon={faDownload} />
			</a>
			<button
				className={cx(styles.action, styles.deleteButton)}
				onClick={deleteFile}
			>
				<FontAwesomeIcon icon={faTrash} />
			</button>
		</div>
	)
}

export default FileRow
