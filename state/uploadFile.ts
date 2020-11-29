import { atom } from 'recoil'

export default atom<File | null>({
	key: 'uploadFile',
	default: null
})
