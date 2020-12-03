import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getUserSlugs = async () => {
	const { docs } = await firestore.collection('users').get()
	return docs.map(snapshot => snapshot.get('slug') as string)
}

export default getUserSlugs
