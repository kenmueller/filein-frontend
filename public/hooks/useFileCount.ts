import { useState, useCallback, SetStateAction } from 'react'

const KEY = 'fileCount'

const getFileCount = () => {
	if (!process.browser)
		return 0
	
	const value = localStorage.getItem(KEY)
	
	return value ? parseInt(value) : 0
}

export default () => {
	const [count, _setCount] = useState(getFileCount())
	
	const setCount = useCallback((count: SetStateAction<number>) => {
		_setCount(oldCount => {
			const newCount = typeof count === 'function'
				? count(oldCount)
				: count
			
			localStorage.setItem(KEY, newCount.toString())
			
			return newCount
		})
	}, [_setCount])
	
	return [count, setCount] as const
}
