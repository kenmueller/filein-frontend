import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { toast } from 'react-toastify'
import cx from 'classnames'

import FileMeta from 'models/FileMeta'
import submitComment from 'lib/submitComment'
import useCurrentUser from 'hooks/useCurrentUser'
import useComments from 'hooks/useComments'
import CommentRow from './CommentRow'

import styles from 'styles/Comments.module.scss'

export interface CommentsProps {
	className?: string
	file: FileMeta
}

const Comments = ({ className, file }: CommentsProps) => {
	const currentUser = useCurrentUser()
	
	const comments = useComments(file)
	const [message, setMessage] = useState('')
	
	const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		if (!currentUser)
			return
		
		submitComment(currentUser.uid, file, message)
			.catch(({ message }) => toast.error(message))
		
		setMessage('')
	}, [currentUser, file, message, setMessage])
	
	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value)
	}, [setMessage])
	
	return (
		<div className={cx(styles.root, className)}>
			<div className={styles.comments}>
				{comments?.map((comment, index) => (
					<CommentRow
						key={comment.id}
						comments={comments}
						comment={comment}
						index={index}
					/>
				))}
			</div>
			<form className={styles.form} onSubmit={onSubmit}>
				<input
					className={styles.input}
					placeholder="What do you have to say?"
					value={message}
					onChange={onChange}
				/>
				<button className={styles.submit} disabled={!message}>
					send
				</button>
			</form>
		</div>
	)
}

export default Comments
