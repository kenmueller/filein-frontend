import { useRef, useState, useCallback, FormEvent, ChangeEvent } from 'react'
import { toast } from 'react-toastify'

import FileMeta from 'models/FileMeta'
import editFileName from 'lib/editFileName'

import styles from 'styles/EditFileName.module.scss'

export interface EditFileNameProps {
	className?: string
	file: FileMeta
}

const EditFileName = ({ className, file }: EditFileNameProps) => {
	const input = useRef<HTMLInputElement | null>(null)
	const [name, setName] = useState(file.name)
	
	const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		if (name)
			input.current?.blur()
	}, [name, input])
	
	const onBlur = useCallback(async () => {
		if (!name)
			return
		
		try {
			await editFileName(file, name)
			toast.success('Updated name')
		} catch ({ message }) {
			toast.error(message)
		}
	}, [file, name])
	
	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value)
	}, [setName])
	
	return (
		<form className={className} onSubmit={onSubmit}>
			<input
				className={styles.input}
				ref={input}
				placeholder={file.name}
				value={name}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</form>
	)
}

export default EditFileName
