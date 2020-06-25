import { nanoid } from 'nanoid'

import firebase from './firebase'

import 'firebase/storage'

const ID_LENGTH = 10

const storage = firebase.storage().ref()

const newId = () =>
	nanoid(ID_LENGTH)

const fileUrl = (id: string) =>
	`https://storage.googleapis.com/file-in.appspot.com/files/${id}`

export default async (file: File) => {
	const id = newId()
	
	await storage.child(`files/${id}`).put(file, {
		contentType: file.type,
		cacheControl: 'public, max-age=31536000, s-maxage=31536000',
		customMetadata: {
			name: file.name,
			size: file.size.toString()
		}
	})
	
	return fileUrl(id)
}
