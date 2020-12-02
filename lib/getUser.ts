import firebase from './firebase'
import snapshotToUser from './snapshotToUser'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getUser = async (id: string) =>
	snapshotToUser(await firestore.doc(`users/${id}`).get())

export default getUser
