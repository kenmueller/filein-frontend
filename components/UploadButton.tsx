import { PropsWithChildren, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { useDropzone } from 'react-dropzone'

import uploadFileState from 'state/uploadFile'

export interface UploadButtonProps extends PropsWithChildren<{}> {
	className?: string
}

const UploadButton = ({ className, children }: UploadButtonProps) => {
	const [, uploadFile] = useRecoilState(uploadFileState)
	
	const onDrop = useCallback((files: File[]) => {
		const file = files[0]
		
		if (file)
			uploadFile(file)
	}, [uploadFile])
	
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		noDrag: true,
		multiple: false
	})
	
	return (
		<div {...getRootProps({ className, role: 'button' })}>
			<input {...getInputProps()} />
			{children}
		</div>
	)
}

export default UploadButton
