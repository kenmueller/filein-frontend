import { atom } from 'recoil'

import CurrentUser from 'models/CurrentUser'

const currentUserState = atom<CurrentUser | null | undefined>({
	key: 'currentUser',
	default: undefined,
	dangerouslyAllowMutability: true
})

export default currentUserState
