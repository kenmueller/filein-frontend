import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'

import firebase from 'lib/firebase'
import snapshotToUser from 'lib/snapshotToUser'
import usersState from 'state/users'

import 'firebase/firestore'

const firestore = firebase.firestore()
const queue = new Set<string>()

const useUser = (id: string | undefined) => {
	const [users, setUsers] = useRecoilState(usersState)
	
	useEffect(() => {
		if (!id || queue.has(id))
			return
		
		queue.add(id)
		
		firestore.doc(`users/${id}`).get()
			.then(snapshot => {
				const user = snapshotToUser(snapshot)
				
				if (user)
					setUsers(users => ({ ...users, [id]: user }))
			})
			.catch(({ message }) => toast.error(message))
	}, [id, setUsers])
	
	return id && users[id]
}

export default useUser
