import { getExtension } from 'mime'

import FileMeta from 'models/FileMeta'
import firebase from './firebase'
import newId from './newId'

import 'firebase/firestore'
import 'firebase/storage'

const { FieldValue } = firebase.firestore
const firestore = firebase.firestore()
const storage = firebase.storage().ref()

const uploadFile = async (
	file: File,
	owner: string | null,
	setProgress: (progress: number) => void
): Promise<FileMeta> => {
	const { name, type, size } = file
	
	const indexOfDot = name.lastIndexOf('.')
	const id = `${newId()}.${
		~indexOfDot
			? name.slice(indexOfDot + 1)
			: getExtension(type)
	}`
	
	const task = storage.child(id).put(file, {
		contentType: type,
		cacheControl: 'public, max-age=31536000, s-maxage=31536000',
		customMetadata: { name, owner }
	})
	
	task.on('state_changed', ({ bytesTransferred, totalBytes }) => {
		setProgress((bytesTransferred / totalBytes) * 90)
	})
	
	await task
	await firestore.doc(`files/${id}`).set({
		name,
		type,
		size,
		owner,
		comments: 0,
		uploaded: FieldValue.serverTimestamp()
	})
	
	setProgress(100)
	
	return { id, name, type, size, owner, comments: 0, uploaded: Date.now() }
}

export default uploadFile
