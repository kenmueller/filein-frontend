import firebase from './firebase'
import getSlug from './getUserSlug'

import 'firebase/auth'
import 'firebase/firestore'
import User from 'models/User'

const auth = firebase.auth()
const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/userinfo.email')

const signIn = async (): Promise<User | null | undefined> => {
	try {
		const {
			user,
			additionalUserInfo
		} = await auth.signInWithPopup(provider)
		
		if (!(user && additionalUserInfo))
			throw new Error('An unknown error occurred. Please try again')
		
		if (!user.email)
			throw new Error('Unable to get your email address')
		
		if (additionalUserInfo.isNewUser) {
			const name = user.displayName ?? 'Anonymous'
			const slug = await getSlug(name)
			
			await firestore.doc(`users/${user.uid}`).set({
				slug,
				apiKey: null,
				name,
				email: user.email,
				files: 0,
				comments: 0,
				joined: firebase.firestore.FieldValue.serverTimestamp()
			})
			
			return { id: user.uid, slug, name, files: 0, comments: 0 }
		}
		
		return null
	} catch (error) {
		switch (error.code) {
			case 'auth/popup-closed-by-user':
				return
			default:
				throw error
		}
	}
}

export default signIn
