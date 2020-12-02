import { useRef, useState, useCallback, useEffect, ChangeEvent, FormEvent } from 'react'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import FileMeta from 'models/FileMeta'
import signIn from 'lib/signIn'
import submitComment from 'lib/submitComment'
import useCurrentUser from 'hooks/useCurrentUser'
import useComments from 'hooks/useComments'
import CommentRow from './CommentRow'
import Spinner from './Spinner'

import styles from 'styles/Comments.module.scss'

export interface CommentsProps {
	className?: string
	file: FileMeta
}

const Comments = ({ className, file }: CommentsProps) => {
	const commentsRef = useRef<HTMLDivElement | null>(null)
	
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
	
	useEffect(() => {
		const { current } = commentsRef
		
		if (current)
			current.scrollTop = current.scrollHeight
	}, [comments, commentsRef])
	
	return (
		<div className={cx(styles.root, className)}>
			<div className={styles.comments} ref={commentsRef}>
				{comments && currentUser !== undefined
					? comments.length
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
						: <p className={styles.empty}>Be the first one to comment</p>
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
