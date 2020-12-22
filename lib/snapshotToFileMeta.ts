import FileMeta from 'models/FileMeta'
import firebase from './firebase'

const snapshotToFileMeta = (snapshot: firebase.firestore.DocumentSnapshot | FirebaseFirestore.DocumentSnapshot): FileMeta | null =>
	snapshot.exists
		? {
			id: snapshot.id,
			name: snapshot.get('name'),
			type: snapshot.get('type'),
			size: snapshot.get('size'),
			owner: snapshot.get('owner'),
			comments: snapshot.get('comments'),
			uploaded: snapshot.get('uploaded')?.toMillis(),
			public: snapshot.get('public')
		}
		: null

export default snapshotToFileMeta
