import firebase from './firebase'
import snapshotToFileMeta from './snapshotToFileMeta'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getFile = async (id: string) =>
	snapshotToFileMeta(await firestore.doc(`files/${id}`).get())

export default getFile
