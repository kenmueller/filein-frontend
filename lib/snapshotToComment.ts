import Comment from 'models/Comment'
import firebase from './firebase'

const snapshotToComment = (snapshot: firebase.firestore.DocumentSnapshot | FirebaseFirestore.DocumentSnapshot) =>
	snapshot.exists
		? {
			...snapshot.data(),
			id: snapshot.id,
			date: snapshot.get('date')?.toMillis()
		} as Comment
		: null

export default snapshotToComment
