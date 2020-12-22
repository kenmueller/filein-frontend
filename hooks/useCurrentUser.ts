import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'

import firebase from 'lib/firebase'
import currentUserState from 'state/currentUser'
import useUser, { UseUserOptions } from './useUser'

import 'firebase/auth'

const USE_USER_OPTIONS: UseUserOptions = {
	observe: true,
	includeApiKey: true
}

const auth = firebase.auth()

const useCurrentUser = () => {
	const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
	const user = useUser(currentUser?.auth?.uid, USE_USER_OPTIONS)
	
	useEffect(() => {
		if (currentUser !== undefined)
			return
		
		auth.onAuthStateChanged(
			auth => setCurrentUser(auth && { auth, data: null }),
			({ message }) => toast.error(message)
		)
	}, [currentUser, setCurrentUser])
	
	useEffect(() => {
		console.log(user)
		setCurrentUser(currentUser => currentUser && {
			...currentUser,
			data: user ?? null
		})
	}, [user, setCurrentUser])
	
	return currentUser
}

export default useCurrentUser
