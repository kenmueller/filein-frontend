import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import FileMeta from 'models/FileMeta'
import FileType from 'models/FileType'
import getFileType from 'lib/getFileType'
import getFileUrl from 'lib/getFileUrl'
import getFileIcon from 'lib/getFileIcon'
import currentFileState from 'state/currentFile'

import styles from 'styles/FileCell.module.scss'

export interface FileCellProps {
	file: FileMeta
}

const FileCell = ({ file }: FileCellProps) => {
	const isImage = getFileType(file) === FileType.Image
	const setCurrentFile = useSetRecoilState(currentFileState)
	
	const onClick = useCallback(() => {
		setCurrentFile(file)
	}, [file, setCurrentFile])
	
	return (
		<button className={cx(styles.root, { [styles.isImage]: isImage })} onClick={onClick}>
			{isImage
				? <img className={styles.image} src={getFileUrl(file, true)} alt={file.name} loading="lazy" />
				: <FontAwesomeIcon className={styles.icon} icon={getFileIcon(file)} />
			}
			<span className={styles.info}>
				<p className={styles.name}>{file.name}</p>
				<span className={styles.comments}>
					<FontAwesomeIcon icon={faComment} />
					<p className={styles.commentCount}>{file.comments}</p>
				</span>
			</span>
		</button>
	)
}

export default FileCell
