import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'

import FileMeta from 'models/FileMeta'
import getFileUrl from 'lib/getFileUrl'
import getFileIcon from 'lib/getFileIcon'

import styles from 'styles/FilePreview.module.scss'

export interface FilePreviewProps {
	file: FileMeta
}

const FilePreview = ({ file }: FilePreviewProps) => {
	const url = getFileUrl(file)
	
	return (
		<a className={styles.root} href={url} rel="noopener noreferrer" target="_blank">
			{file.type.startsWith('image/')
				? <img className={styles.image} src={url} alt={file.name} />
				: <FontAwesomeIcon className={styles.icon} icon={getFileIcon(file)} />
			}
		</a>
	)
}

export default FilePreview
