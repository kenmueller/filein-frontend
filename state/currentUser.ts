import { atom } from 'recoil'

import firebase from 'lib/firebase'

import 'firebase/auth'

const currentUserState = atom<firebase.User | null | undefined>({
	key: 'currentUser',
	default: undefined,
	dangerouslyAllowMutability: true
})

export default currentUserState
