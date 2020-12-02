import FileMeta from 'models/FileMeta'
import firebase from './firebase'

import 'firebase/firestore'

const firestore = firebase.firestore()

const editFileName = ({ id }: FileMeta, name: string) =>
	firestore.doc(`files/${id}`).update({ name })

export default editFileName
