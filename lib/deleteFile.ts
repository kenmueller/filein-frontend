import firebase from './firebase'

import 'firebase/storage'

const storage = firebase.storage().ref()

const deleteFile = (id: string): Promise<void> =>
	storage.child(`files/${id}`).delete()

export default deleteFile
