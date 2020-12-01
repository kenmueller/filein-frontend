import functions from 'firebase-functions'
import admin from 'firebase-admin'

admin.initializeApp({
	storageBucket: 'file-in.appspot.com'
})

const { FieldValue } = admin.firestore
const firestore = admin.firestore()

export const commentCreated = functions.firestore
	.document('files/{fileId}/comments/{commentId}')
	.onCreate((_snapshot, { params: { fileId } }) => {
		firestore.doc(`files/${fileId}`).update({
			comments: FieldValue.increment(1)
		})
	})
