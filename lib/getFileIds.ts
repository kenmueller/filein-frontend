import firebase from './firebase'

import 'firebase/firestore'

const LIMIT = 1000

const firestore = firebase.firestore()

const getFileIds = async () => {
	const { docs } = await firestore
		.collection('files')
		.orderBy('uploaded', 'desc')
		.limit(LIMIT)
		.get()

	return docs.map(({ id }) => id)
}

export default getFileIds
