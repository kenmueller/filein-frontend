import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

const editUserName = (uid: string, name: string) =>
	firestore.doc(`users/${uid}`).update({ name })

export default editUserName
