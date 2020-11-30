import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'

import FileMeta from 'models/FileMeta'
import isFileImage from 'lib/isFileImage'
import getFileUrl from 'lib/getFileUrl'
import getFileIcon from 'lib/getFileIcon'

import styles from 'styles/FileCell.module.scss'

export interface FileCellProps {
	file: FileMeta
}

const FileCell = ({ file }: FileCellProps) => {
	const isImage = isFileImage(file)
	
	return (
		<button className={cx(styles.root, { [styles.isImage]: isImage })}>
			{isImage
				? <img className={styles.image} src={getFileUrl(file)} alt={file.name} loading="lazy" />
				: <FontAwesomeIcon className={styles.icon} icon={getFileIcon(file)} />
			}
			<p className={styles.name}>{file.name}</p>
		</button>
	)
}

export default FileCell
