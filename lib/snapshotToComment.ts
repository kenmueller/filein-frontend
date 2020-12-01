import Comment from 'models/Comment'
import firebase from './firebase'

import 'firebase/firestore'

const snapshotToComment = (snapshot: firebase.firestore.DocumentSnapshot) =>
	snapshot.exists
		? {
			...snapshot.data(),
			id: snapshot.id,
			date: snapshot.get('date')?.toMillis()
		} as Comment
		: null

export default snapshotToComment
