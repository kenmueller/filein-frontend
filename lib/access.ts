const KEY = 'filein.io-file-private'

export const getIsPublic = () =>
	!localStorage.getItem(KEY)

export const setIsPublic = (isPublic: boolean) =>
	isPublic
		? localStorage.removeItem(KEY)
		: localStorage.setItem(KEY, '1')
