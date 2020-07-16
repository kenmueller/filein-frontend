import { useState, useCallback, SetStateAction } from 'react'

const KEY = 'files'

export interface File {
	id: string
	name: string
	url: string
	image: boolean
}

const getFiles = (): File[] => {
	if (!process.browser)
		return []
	
	const value = localStorage.getItem(KEY)
	
	return value ? JSON.parse(value) : []
}

export default () => {
	const [files, _setFiles] = useState(getFiles())
	
	const setFiles = useCallback((files: SetStateAction<File[]>) => {
		_setFiles(oldFiles => {
			const newFiles = typeof files === 'function'
				? files(oldFiles)
				: files
			
			if (process.browser)
				localStorage.setItem(KEY, JSON.stringify(newFiles))
			
			return newFiles
		})
	}, [_setFiles])
	
	return [files, setFiles] as const
}
