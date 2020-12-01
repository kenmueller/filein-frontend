import { useState, useCallback, ChangeEvent, FormEvent, useEffect } from 'react'
import { toast } from 'react-toastify'
import cx from 'classnames'

import FileMeta from 'models/FileMeta'
import signIn from 'lib/signIn'
import submitComment from 'lib/submitComment'
import useCurrentUser from 'hooks/useCurrentUser'
import useComments from 'hooks/useComments'
import CommentRow from './CommentRow'

import styles from 'styles/Comments.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import Spinner from './Spinner'

export interface CommentsProps {
	className?: string
	file: FileMeta
}

const Comments = ({ className, file }: CommentsProps) => {
	const currentUser = useCurrentUser()
	const comments = useComments(file)
	
	const [message, setMessage] = useState('')
	const [isLoading, setIsLoading] = useState(currentUser === undefined)
	
	const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		if (!currentUser) {
			setIsLoading(true)
			
			signIn()
				.catch(({ message }) => toast.error(message))
				.finally(() => setIsLoading(false))
			
			return
		}
		
		submitComment(currentUser.uid, file, message)
			.catch(({ message }) => toast.error(message))
		
		setMessage('')
	}, [currentUser, file, message, setMessage, setIsLoading])
	
	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value)
	}, [setMessage])
	
	useEffect(() => {
		setIsLoading(currentUser === undefined)
	}, [currentUser, setIsLoading])
	
	return (
		<div className={cx(styles.root, className)}>
			<div className={styles.comments}>
				{comments && currentUser !== undefined
					? comments.map((comment, index) => (
						<CommentRow
							key={comment.id}
							currentUser={currentUser}
							file={file}
							comments={comments}
							comment={comment}
							index={index}
						/>
					))
					: <Spinner className={styles.commentsSpinner} />
				}
			</div>
			<form className={styles.form} onSubmit={onSubmit}>
				<input
					className={styles.input}
					disabled={!currentUser}
					placeholder={
						currentUser === undefined
							? undefined
							: currentUser
								? `as ${currentUser.displayName}`
								: 'You must be signed in to comment'
					}
					value={message}
					onChange={onChange}
				/>
				<FontAwesomeIcon className={styles.inputIcon} icon={faComment} />
				<button
					className={styles.button}
					disabled={isLoading || (currentUser && !message)}
				>
					{isLoading
						? <Spinner className={styles.buttonSpinner} />
						: currentUser ? 'send' : 'sign in'
					}
				</button>
			</form>
		</div>
	)
}

export default Comments
