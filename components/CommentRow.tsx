import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCrown } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import CurrentUser from 'models/CurrentUser'
import FileMeta from 'models/FileMeta'
import Comment from 'models/Comment'
import useUser from 'hooks/useUser'
import useHideOverlays from 'hooks/useHideOverlays'
import Spinner from './Spinner'

import styles from 'styles/CommentRow.module.scss'

export interface CommentRowProps {
	currentUser: CurrentUser | null
	file: FileMeta
	comments: Comment[]
	comment: Comment
	index: number
}

const CommentRow = ({ currentUser, file, comments, comment, index }: CommentRowProps) => {
	const fromSelf = currentUser?.auth.uid === comment.from
	const showName = !fromSelf && comments[index - 1]?.from !== comment.from
	
	const user = useUser(showName ? comment.from : undefined)
	const hideOverlays = useHideOverlays()
	
	return (
		<div className={cx(styles.root, {
			[styles.showName]: showName,
			[styles.fromSelf]: fromSelf
		})}>
			{showName && (user
				? (
					<Link href={`/${user.slug}`}>
						<a className={styles.link} onClick={hideOverlays}>
							<span className={styles.name}>{user.name}</span>
							<FontAwesomeIcon
								className={styles.icon}
								icon={file.owner === user.id ? faCrown : faChevronRight}
							/>
						</a>
					</Link>
				)
				: <Spinner className={styles.spinner} />
			)}
			<p className={styles.body}>{comment.body}</p>
		</div>
	)
}

export default CommentRow
