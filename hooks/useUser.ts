import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'

import firebase from 'lib/firebase'
import snapshotToUser from 'lib/snapshotToUser'
import usersState from 'state/users'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getQueue = new Set<string>()
const observeQueue = new Set<string>()

const onError = ({ message }: Error) => {
	toast.error(message)
}

export interface UseUserOptions {
	observe?: boolean
	includeApiKey?: boolean
}

/**
 * - `undefined` - loading
 * - `null` - nonexistent
 * - `User` - loaded
 */
const useUser = (
	id: string | null | undefined,
	{ observe = false, includeApiKey = false }: UseUserOptions = {}
) => {
	const [users, setUsers] = useRecoilState(usersState)
	
	const onSnapshot = useCallback((snapshot: firebase.firestore.DocumentSnapshot) => {
		setUsers(users => ({
			...users,
			[id]: snapshotToUser(snapshot, includeApiKey)
		}))
	}, [id, includeApiKey, setUsers])
	
	useEffect(() => {
		if (!id)
			return
		
		const queue = observe ? observeQueue : getQueue
		
		if (queue.has(id))
			return
		
		queue.add(id)
		const doc = firestore.doc(`users/${id}`)
		
		observe
			? doc.onSnapshot(onSnapshot, onError)
			: doc.get().then(onSnapshot).catch(onError)
	}, [id, observe, onSnapshot])
	
	return id && users[id]
}

export default useUser
