import { useRef, useState, useCallback, FormEvent, ChangeEvent } from 'react'
import { useSetRecoilState } from 'recoil'
import { toast } from 'react-toastify'

import CurrentUser from 'models/CurrentUser'
import editUserName from 'lib/editUserName'
import currentUserState from 'state/currentUser'

import styles from 'styles/EditUserName.module.scss'

export interface EditUserNameProps {
	className?: string
	user: CurrentUser
}

const EditUserName = ({ className, user }: EditUserNameProps) => {
	const setCurrentUser = useSetRecoilState(currentUserState)
	
	const uid = user.auth?.uid ?? user.data?.id
	const currentName = user.data?.name ?? user.auth?.displayName
	
	const input = useRef<HTMLInputElement | null>(null)
	const [name, setName] = useState(currentName)
	
	const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		if (name)
			input.current?.blur()
	}, [name, input])
	
	const onBlur = useCallback(async () => {
		if (!(uid && name) || currentName === name)
			return
		
		try {
			await editUserName(uid, name)
			
			setCurrentUser(currentUser => ({
				...currentUser,
				data: { ...currentUser.data, name }
			}))
			
			toast.success('Updated name')
		} catch ({ message }) {
			toast.error(message)
		}
	}, [uid, currentName, name, setCurrentUser])
	
	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value)
	}, [setName])
	
	return (
		<form className={className} onSubmit={onSubmit}>
			<input
				className={styles.input}
				ref={input}
				placeholder={currentName}
				value={name}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</form>
	)
}

export default EditUserName
