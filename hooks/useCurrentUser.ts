import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'

import firebase from 'lib/firebase'
import currentUserState from 'state/currentUser'

import 'firebase/auth'

const auth = firebase.auth()

const useCurrentUser = () => {
	const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
	
	useEffect(() => {
		if (currentUser !== undefined)
			return
		
		auth.onAuthStateChanged(
			setCurrentUser,
			({ message }) => toast.error(message)
		)
	}, [currentUser, setCurrentUser])
	
	return currentUser
}

export default useCurrentUser
