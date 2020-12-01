import FileMeta from 'models/FileMeta'
import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

const deleteFile = (file: FileMeta) =>
	firestore.doc(`files/${file.id}`).delete()

export default deleteFile
