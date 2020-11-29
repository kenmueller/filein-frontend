import { atom } from 'recoil'

import FileMeta from 'models/FileMeta'

const recentlyUploadedFilesState = atom<FileMeta[] | null | undefined>({
	key: 'recentlyUploadedFiles',
	default: undefined
})

export default recentlyUploadedFilesState
