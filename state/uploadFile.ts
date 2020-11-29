import { atom } from 'recoil'

const uploadFileState = atom<File | null>({
	key: 'uploadFile',
	default: null
})

export default uploadFileState
