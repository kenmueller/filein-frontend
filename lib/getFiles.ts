import firebase from './firebase'
import snapshotToFileMeta from './snapshotToFileMeta'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getFiles = async (uid: string) => {
	const { docs } = await firestore
		.collection('files')
		.where('owner', '==', uid)
		.get()
	
	return docs
		.map(snapshotToFileMeta)
		.sort((a, b) => b.uploaded - a.uploaded)
}

export default getFiles
