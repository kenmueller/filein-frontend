import { atom } from 'recoil'

import FileMeta from 'models/FileMeta'

const filesState = atom<Record<string, FileMeta[]>>({
	key: 'files',
	default: {},
	dangerouslyAllowMutability: true
})

export default filesState
