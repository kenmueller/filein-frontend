import firebase from './firebase'

import 'firebase/storage'

const storage = firebase.storage().ref()

export default (id: string) =>
	storage.child(`files/${id}`).delete()
