import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'

import FileMeta from 'models/FileMeta'
import firebase from 'lib/firebase'
import snapshotToComment from 'lib/snapshotToComment'
import commentsState from 'state/comments'

import 'firebase/firestore'

const firestore = firebase.firestore()
const queue = new Set<string>()

const useComments = (file: FileMeta) => {
	const [comments, setComments] = useRecoilState(commentsState)
	
	useEffect(() => {
		if (queue.has(file.id))
			return
		
		queue.add(file.id)
		
		firestore.collection(`files/${file.id}/comments`).onSnapshot(
			snapshot => {
				setComments(_comments => {
					let comments = _comments[file.id] ?? []
					
					for (const { type, doc } of snapshot.docChanges())
						switch (type) {
							case 'added': {
								const comment = snapshotToComment(doc)
								
								if (comment)
									comments = [...comments, comment]
								
								break
							}
							case 'modified':
								comments = comments.map(comment =>
									comment.id === doc.id
										? snapshotToComment(doc) ?? comment
										: comment
								)
								break
							case 'removed':
								comments = comments.filter(({ id }) => id !== doc.id)
								break
						}
					
					return {
						..._comments,
						[file.id]: comments.sort((a, b) => a.date - b.date)
					}
				})
			},
			({ message }) => toast.error(message)
		)
	}, [file.id, setComments])
	
	return comments[file.id]
}

export default useComments
