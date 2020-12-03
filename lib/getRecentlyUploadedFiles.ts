import firebase from './firebase'
import snapshotToFileMeta from './snapshotToFileMeta'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getRecentlyUploadedFiles = async () => {
	const { docs } = await firestore
		.collection('files')
		.orderBy('uploaded', 'desc')
		.limit(50)
		.get()
	
	return docs
		.map(snapshotToFileMeta)
		.filter(file => file.public)
}

export default getRecentlyUploadedFiles
