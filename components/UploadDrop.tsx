import { ReactNode, useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import { useDropzone } from 'react-dropzone'

import uploadFileState from 'state/uploadFile'
import UploadDropOverlay from './UploadDropOverlay'

export interface UploadDropProps {
	children?: ReactNode
}

const UploadDrop = ({ children }: UploadDropProps) => {
	const setFile = useSetRecoilState(uploadFileState)
	
	const onDrop = useCallback((files: File[]) => {
		const file = files[0]
		if (file) setFile(file)
	}, [setFile])
	
	const onDragEnter = useCallback(() => {
		setFile(null)
	}, [setFile])
	
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		onDragEnter,
		noClick: true,
		multiple: false
	})
	
	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			<UploadDropOverlay active={isDragActive} />
			{children}
		</div>
	)
}

export default UploadDrop
