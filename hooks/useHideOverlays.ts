import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import currentFileState from 'state/currentFile'
import uploadFileState from 'state/uploadFile'

const useHideOverlays = () => {
	const setCurrentFile = useSetRecoilState(currentFileState)
	const setUploadFile = useSetRecoilState(uploadFileState)
	
	return useCallback(() => {
		setCurrentFile(null)
		setUploadFile(null)
	}, [setCurrentFile, setUploadFile])
}

export default useHideOverlays
