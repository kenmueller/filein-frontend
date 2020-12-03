import { useRef, useState, useCallback, FormEvent, ChangeEvent } from 'react'
import { toast } from 'react-toastify'

import FileMeta from 'models/FileMeta'
import normalizeExtension from 'lib/normalizeExtension'
import editFileName from 'lib/editFileName'

import styles from 'styles/EditFileName.module.scss'

export interface EditFileNameProps {
	className?: string
	file: FileMeta
	onEdit?(file: FileMeta): void
	disabledMessage?: string
}

const EditFileName = ({ className, file, onEdit, disabledMessage }: EditFileNameProps) => {
	const input = useRef<HTMLInputElement | null>(null)
	const [name, setName] = useState(file.name)
	
	const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		if (name)
			input.current?.blur()
	}, [name, input])
	
	const onBlur = useCallback(async () => {
		if (!name)
			return setName(file.name)
		
		const newName = normalizeExtension(file.name, name)
		
		if (file.name === newName)
			return setName(newName)
		
		try {
			await editFileName(file, newName)
			
			setName(newName)
			onEdit?.({ ...file, name: newName })
			
			toast.success('Updated name')
		} catch ({ message }) {
			toast.error(message)
		}
	}, [file, name, setName, onEdit])
	
	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value)
	}, [setName])
	
	return (
		<form
			className={className}
			onSubmit={onSubmit}
			aria-label={disabledMessage}
			data-balloon-pos={disabledMessage ? 'down-left' : undefined}
		>
			<input
				className={styles.input}
				ref={input}
				disabled={Boolean(disabledMessage)}
				placeholder={file.name}
				value={name}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</form>
	)
}

export default EditFileName
