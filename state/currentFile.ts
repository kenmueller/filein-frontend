import { atom } from 'recoil'

import FileMeta from 'models/FileMeta'

const currentFileState = atom<FileMeta | null>({
	key: 'currentFile',
	default: null
})

export default currentFileState
