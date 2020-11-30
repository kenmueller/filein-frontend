import FileMeta from 'models/FileMeta'
import firebase from './firebase'

import 'firebase/firestore'

const snapshotToFileMeta = (snapshot: firebase.firestore.DocumentSnapshot) =>
	snapshot.exists
		? {
			...snapshot.data(),
			id: snapshot.id,
			uploaded: snapshot.get('uploaded')?.toMillis()
		} as FileMeta
		: null

export default snapshotToFileMeta
