import { PropsWithChildren, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { useDropzone } from 'react-dropzone'

import uploadFileState from 'state/uploadFile'

export interface UploadDropProps extends PropsWithChildren<{}> {}

const UploadDrop = ({ children }: UploadDropProps) => {
	const [, uploadFile] = useRecoilState(uploadFileState)
	
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
