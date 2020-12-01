import FileMeta from 'models/FileMeta'
import useComments from 'hooks/useComments'

import styles from 'styles/Comments.module.scss'

export interface CommentsProps {
	file: FileMeta
}

const Comments = ({ file }: CommentsProps) => {
	const comments = useComments(file)
	
	return (
		<div>
			<div>
				{comments?.map(comment => (
					<p key={comment.id}>{comment.body}</p>
				))}
			</div>
			<form>
				<input />
				<button>send</button>
			</form>
		</div>
	)
}

export default Comments
