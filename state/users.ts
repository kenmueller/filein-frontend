import { atom } from 'recoil'

import User from 'models/User'

const usersState = atom<Record<string, User>>({
	key: 'users',
	default: {}
})

export default usersState
