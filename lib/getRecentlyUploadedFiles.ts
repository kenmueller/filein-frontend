import firebase from './firebase'
import snapshotToFileMeta from './snapshotToFileMeta'
import { RECENTLY_UPLOADED_FILES_LIMIT } from './constants'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getRecentlyUploadedFiles = async () => {
	const { docs } = await firestore
		.collection('files')
		.orderBy('uploaded', 'desc')
		.limit(RECENTLY_UPLOADED_FILES_LIMIT)
		.get()
	
	return docs
		.map(snapshotToFileMeta)
		.filter(file => file.public)
}

export default getRecentlyUploadedFiles
