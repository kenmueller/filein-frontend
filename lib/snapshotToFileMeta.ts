import FileMeta from 'models/FileMeta'
import firebase from './firebase'

import 'firebase/firestore'

const snapshotToFileMeta = (snapshot: firebase.firestore.DocumentSnapshot) =>
	snapshot.exists
		? { id: snapshot.id, ...snapshot.data() } as FileMeta
		: null

export default snapshotToFileMeta
