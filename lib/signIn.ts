import firebase from './firebase'
import getSlug from './getUserSlug'

import 'firebase/auth'
import 'firebase/firestore'

const auth = firebase.auth()
const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/userinfo.email')

const signIn = async () => {
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
			
			await firestore.doc(`users/${user.uid}`).set({
				slug: await getSlug(name),
				name,
				email: user.email,
				joined: firebase.firestore.FieldValue.serverTimestamp()
			})
		}
		
		return user.uid
	} catch (error) {
		switch (error.code) {
			case 'auth/popup-closed-by-user':
				return null
			default:
				throw error
		}
	}
}

export default signIn
