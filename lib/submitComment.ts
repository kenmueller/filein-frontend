import FileMeta from 'models/FileMeta'
import firebase from './firebase'

import 'firebase/firestore'

const { FieldValue } = firebase.firestore
const firestore = firebase.firestore()

const submitComment = (uid: string, file: FileMeta, body: string) =>
	firestore.collection(`files/${file.id}/comments`).add({
		from: uid,
		body,
		date: FieldValue.serverTimestamp()
	})

export default submitComment
