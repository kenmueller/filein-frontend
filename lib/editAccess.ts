import { toast } from 'react-toastify'

import FileMeta from 'models/FileMeta'
import firebase from './firebase'
import { setIsPublic } from './access'

import 'firebase/firestore'

const firestore = firebase.firestore()

const editAccess = async (file: FileMeta, isPublic: boolean) => {
	const _isPublic = file.public
	
	try {
		file.public = isPublic
		setIsPublic(isPublic)
		
		await firestore.doc(`files/${file.id}`).update({
			public: isPublic
		})
	} catch ({ message }) {
		file.public = _isPublic
		setIsPublic(_isPublic)
		
		toast.error(message)
	}
}

export default editAccess
