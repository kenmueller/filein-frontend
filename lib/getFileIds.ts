import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getFileIds = async () =>
	(await firestore.collection('files').get())
		.docs
		.map(({ id }) => id)

export default getFileIds
