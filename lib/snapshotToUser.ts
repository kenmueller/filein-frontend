import User from 'models/User'
import firebase from './firebase'

const snapshotToUser = (snapshot: firebase.firestore.DocumentSnapshot | FirebaseFirestore.DocumentSnapshot): User | null =>
	snapshot.exists
		? {
			id: snapshot.id,
			slug: snapshot.get('slug'),
			name: snapshot.get('name'),
			files: snapshot.get('files'),
			comments: snapshot.get('comments')
		}
		: null

export default snapshotToUser
