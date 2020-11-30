import { ReactNode, useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import { useDropzone } from 'react-dropzone'

import uploadFileState from 'state/uploadFile'

export interface UploadDropProps {
	children?: ReactNode
}

const UploadDrop = ({ children }: UploadDropProps) => {
	const uploadFile = useSetRecoilState(uploadFileState)
	
	const onDrop = useCallback((files: File[]) => {
		const file = files[0]
		
		if (file)
			uploadFile(file)
	}, [uploadFile])
	
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		noClick: true,
		multiple: false
	})
	
	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			{children}
		</div>
	)
}

export default UploadDrop
