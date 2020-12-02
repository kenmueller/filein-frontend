import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import signIn from 'lib/signIn'
import currentUserState from 'state/currentUser'

const useSignIn = () => {
	const setCurrentUser = useSetRecoilState(currentUserState)
	
	return useCallback(async () => {
		const data = await signIn()
		
		if (data)
			setCurrentUser(user => ({
				auth: user?.auth ?? null,
				data
			}))
		
		return data !== undefined
	}, [setCurrentUser])
}

export default useSignIn
