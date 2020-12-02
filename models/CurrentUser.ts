import User from './User'
import firebase from 'lib/firebase'

import 'firebase/auth'

export default interface CurrentUser {
	auth: firebase.User
	data: User | null
}
