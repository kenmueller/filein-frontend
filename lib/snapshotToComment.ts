import Comment from 'models/Comment'
import firebase from './firebase'

import 'firebase/firestore'

const snapshotToComment = (snapshot: firebase.firestore.DocumentSnapshot): Comment | null =>
	snapshot.exists
		? {
			id: snapshot.id,
			from: snapshot.get('from'),
			body: snapshot.get('body'),
			date: snapshot.get('date')?.toMillis()
		}
		: null

export default snapshotToComment
