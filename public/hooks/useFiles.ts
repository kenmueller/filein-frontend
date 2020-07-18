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
	
	return value
		? JSON.parse(value).map((file: any) => ({
			...file,
			url: `https://storage.googleapis.com/file-in.appspot.com/files/${file.id}`
		}))
		: []
}

export default () => {
	const [files, _setFiles] = useState(getFiles())
	
	const setFiles = useCallback((files: SetStateAction<File[]>) => {
		_setFiles(oldFiles => {
			const newFiles = typeof files === 'function'
				? files(oldFiles)
				: files
			
			if (process.browser)
				localStorage.setItem(
					KEY,
					JSON.stringify(
						newFiles.map(({ id, name, image }) => ({ id, name, image }))
					)
				)
			
			return newFiles
		})
	}, [_setFiles])
	
	return [files, setFiles] as const
}
