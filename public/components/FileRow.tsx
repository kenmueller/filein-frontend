import { SetStateAction, useState, useCallback, ChangeEvent, FormEvent, useRef } from 'react'
import cx from 'classnames'

import { File } from 'hooks/useFiles'

import styles from 'styles/FileRow.module.scss'

export interface FileRowProps {
	file: File
	setFiles(files: SetStateAction<File[]>): void
}

const FileRow = ({ file, setFiles }: FileRowProps) => {
	const nameInput = useRef(null as HTMLInputElement | null)
	
	const [name, setName] = useState(file.name)
	
	const onNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value)
	}, [setName])
	
	const onNameSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		setFiles(files =>
			files.map(_file => ({
				..._file,
				name: _file.id === file.id ? name : _file.name
			}))
		)
		
		nameInput.current.blur()
	}, [setFiles, file.id, name])
	
	return (
		<tr>
			<td
				className={cx(styles.icon, {
					[styles.noImage]: !file.image
				})}
				style={
					file.image
						? { background: `url(${file.url})` }
						: undefined
				}
			/>
			<td className={styles.name}>
				<form onSubmit={onNameSubmit}>
					<input
						ref={nameInput}
						value={name}
						onChange={onNameChange}
					/>
				</form>
			</td>
		</tr>
	)
}

export default FileRow
