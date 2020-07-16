import { useState, useCallback } from 'react'
import Head from 'next/head'
import { useDropzone } from 'react-dropzone'
import copy from 'copy-to-clipboard'
import { toast, ToastContainer } from 'react-toastify'
import cx from 'classnames'

import sleep from 'lib/sleep'
import uploadFile from 'lib/uploadFile'
import useFiles from 'hooks/useFiles'
import Navbar from 'components/Navbar'
import Loader from 'components/Loader'
import DropIcon from 'components/DropIcon'

import styles from 'styles/index.module.scss'

const SWAP_ANIMATION_DURATION = 400

const Home = () => {
	const [files, setFiles] = useFiles()
	
	const [isSwapping, setIsSwapping] = useState(false)
	const [isLoading, _setIsLoading] = useState(false)
	
	const setIsLoading = useCallback(async (isLoading: boolean) => {
		setIsSwapping(true)
		
		await sleep(SWAP_ANIMATION_DURATION / 2)
		_setIsLoading(isLoading)
		await sleep(SWAP_ANIMATION_DURATION / 2)
		
		setIsSwapping(false)
	}, [setIsSwapping, _setIsLoading])
	
	const onDrop = useCallback(async (files: File[]) => {
		const file = files[0]
		
		if (!file)
			return
		
		setIsLoading(true)
		
		try {
			const { id, url, image } = await uploadFile(file)
			
			copy(url)
			setFiles(files => [{
				id,
				name: file.name,
				url,
				image
			}, ...files])
			
			toast.success(
				<p onClick={() => window.open(url)}>
					Copied URL to clipboard
				</p>
			)
		} catch {
			toast.error('Files must be under 10 GB')
		}
		
		setIsLoading(false)
	}, [setIsLoading])
	
	const {
		getRootProps,
		getInputProps,
		isDragActive
	} = useDropzone({ onDrop })
	
	return (
		<>
			<Head>
				<meta
					key="description"
					name="description"
					content="Super fast file hosting, one drag away"
				/>
				<title key="title">
					Filein
				</title>
			</Head>
			<div {...getRootProps()} className={styles.root}>
				<input {...getInputProps({ multiple: false })} />
				<Navbar fileCount={files.length} />
				<div className={cx(styles.content, {
					[styles.contentSwapping]: isSwapping,
					[styles.contentReady]: !isLoading
				})}>
					{isLoading
						? <Loader />
						: (
							<>
								<DropIcon isDragging={isDragActive} />
								<h2 className={styles.contentTitle}>
									Click or drag
								</h2>
							</>
						)
					}
				</div>
			</div>
			<ToastContainer className="toast" />
		</>
	)
}

export default Home
