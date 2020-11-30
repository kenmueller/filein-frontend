import { atom } from 'recoil'

import FileMeta from 'models/FileMeta'

const filesState = atom<Record<string, FileMeta[]>>({
	key: 'files',
	default: {}
})

export default filesState
