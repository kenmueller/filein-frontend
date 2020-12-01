import Comment from 'models/Comment'

import styles from 'styles/CommentRow.module.scss'

export interface CommentRowProps {
	comments: Comment[]
	comment: Comment
	index: number
}

const CommentRow = ({ comments, comment, index }: CommentRowProps) => {
	return <p>{comment.body}</p>
}

export default CommentRow
