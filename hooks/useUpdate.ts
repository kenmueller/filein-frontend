import { useState, useCallback } from 'react'

const useUpdate = () => {
	const [, setState] = useState({})
	return useCallback(() => setState({}), [setState])
}

export default useUpdate
