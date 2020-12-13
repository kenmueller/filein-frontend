import { atom } from 'recoil'

import FileMeta from 'models/FileMeta'

const recentlyUploadedFilesState = atom<FileMeta[] | null>({
	key: 'recentlyUploadedFiles',
	default: null,
	dangerouslyAllowMutability: true
})

export default recentlyUploadedFilesState
