import { useCallback } from 'react'
import dynamic from 'next/dynamic'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareSquare, faVideo, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import FileMeta from 'models/FileMeta'
import FileType from 'models/FileType'
import getFileType from 'lib/getFileType'
import getFileUrl from 'lib/getFileUrl'
import getFileIcon from 'lib/getFileIcon'

import styles from 'styles/FilePreview.module.scss'

export const MAX_FILE_PREVIEW_SIZE = 150 * 1024 * 1024 // 150 MB

interface FilePreviewIconProps {
	file: FileMeta
}

interface FilePreviewContentProps {
	file: FileMeta
	type: FileType
	isFallback: boolean
}

export interface FilePreviewProps {
	className?: string
	file: FileMeta
}

const PDF = dynamic(() => import('./PDF'), { ssr: false })

const FilePreviewIcon = ({ file }: FilePreviewIconProps) => (
	<FontAwesomeIcon className={styles.icon} icon={getFileIcon(file)} />
)

const FilePreviewContent = ({ file, type, isFallback }: FilePreviewContentProps) => {
	if (isFallback)
		return <FilePreviewIcon file={file} />
	
	switch (type) {
		case FileType.Image:
			return <img className={styles.imageElement} src={getFileUrl(file, true)} alt={file.name} />
		case FileType.Video:
			return (
				<video className={styles.videoElement} controls autoPlay controlsList="nodownload">
					<source src={getFileUrl(file, true)} type={file.type} />
					<FontAwesomeIcon className={styles.icon} icon={faVideo} />
				</video>
			)
		case FileType.Audio:
			return (
				<>
					<FontAwesomeIcon className={styles.icon} icon={faVolumeUp} />
					<audio className={styles.audioElement} controls autoPlay controlsList="nodownload">
						<source src={getFileUrl(file, true)} type={file.type} />
						Audio is not supported
					</audio>
				</>
			)
		case FileType.PDF:
			return <PDF className={styles.document} url={file.blob ?? getFileUrl(file, true)} />
		case FileType.Other:
			return <FilePreviewIcon file={file} />
	}
}

const FilePreview = ({ className, file }: FilePreviewProps) => {
	const type = getFileType(file)
	const isFallback = file.size > MAX_FILE_PREVIEW_SIZE
	
	const onClick = useCallback(() => {
		copy(`https://filein.io/${file.id}`)
		toast.success('Copied link to clipboard')
	}, [file.id])
	
	return (
		<div
			className={cx(styles.root, styles[type], className, {
				[styles.fallback]: isFallback
			})}
			onClick={onClick}
			role="button"
			title="Share"
		>
			<FilePreviewContent file={file} type={type} isFallback={isFallback} />
			<span className={styles.shareContainer}>
				<FontAwesomeIcon className={styles.share} icon={faShareSquare} />
			</span>
		</div>
	)
}

export default FilePreview
