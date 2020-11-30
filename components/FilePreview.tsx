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
	const url = getFileUrl(file)
	
	return (
		<a
			className={cx(styles.root, className)}
			href={url}
			rel="noopener noreferrer"
			target="_blank"
		>
			{isFileImage(file)
				? <img className={styles.image} src={url} alt={file.name} />
				: <FontAwesomeIcon className={styles.icon} icon={getFileIcon(file)} />
			}
			<FontAwesomeIcon className={styles.share} icon={faShareSquare} />
		</a>
	)
}

export default FilePreview
