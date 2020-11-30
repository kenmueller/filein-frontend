import firebase from './firebase'

import 'firebase/auth'

const auth = firebase.auth()

const signOut = () =>
	auth.signOut()

export default signOut
