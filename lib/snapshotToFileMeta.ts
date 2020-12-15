import FileMeta from 'models/FileMeta'
import firebase from './firebase'

const snapshotToFileMeta = (snapshot: firebase.firestore.DocumentSnapshot | FirebaseFirestore.DocumentSnapshot) =>
	snapshot.exists
		? {
			...snapshot.data(),
			id: snapshot.id,
			uploaded: snapshot.get('uploaded')?.toMillis()
		} as FileMeta
		: null

export default snapshotToFileMeta
