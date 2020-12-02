import { useCallback } from 'react'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareSquare } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import FileMeta from 'models/FileMeta'
import getFileUrl from 'lib/getFileUrl'
import isFileImage from 'lib/isFileImage'
import getFileIcon from 'lib/getFileIcon'

import styles from 'styles/FilePreview.module.scss'

export interface FilePreviewProps {
	className?: string
	file: FileMeta
}

const FilePreview = ({ className, file }: FilePreviewProps) => {
	const isImage = isFileImage(file)
	
	const onClick = useCallback(() => {
		copy(`https://filein.io/${file.id}`)
		toast.success('Copied link to clipboard')
	}, [file.id])
	
	return (
		<button
			className={cx(styles.root, className, {
				[styles.hasIcon]: !isImage
			})}
			onClick={onClick}
			title="Share"
		>
			{isImage
				? <img className={styles.image} src={getFileUrl(file, true)} alt={file.name} />
				: <FontAwesomeIcon className={styles.icon} icon={getFileIcon(file)} />
			}
			<span className={styles.shareContainer}>
				<FontAwesomeIcon className={styles.share} icon={faShareSquare} />
			</span>
		</button>
	)
}

export default FilePreview
