import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'

import firebase from 'lib/firebase'
import currentUserState from 'state/currentUser'
import useUser from './useUser'

import 'firebase/auth'

const auth = firebase.auth()

const useCurrentUser = () => {
	const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
	const user = useUser(currentUser?.auth.uid)
	
	useEffect(() => {
		if (currentUser !== undefined)
			return
		
		auth.onAuthStateChanged(
			auth => setCurrentUser(({ auth, data: null })),
			({ message }) => toast.error(message)
		)
	}, [currentUser, setCurrentUser])
	
	useEffect(() => {
		if (!user)
			return
		
		setCurrentUser(currentUser =>
			currentUser && { ...currentUser, data: user }
		)
	}, [user, setCurrentUser])
	
	return currentUser
}

export default useCurrentUser
