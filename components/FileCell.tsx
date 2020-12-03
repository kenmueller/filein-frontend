import { useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useSetRecoilState } from 'recoil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faVideo } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import FileMeta from 'models/FileMeta'
import FileType from 'models/FileType'
import getFileType from 'lib/getFileType'
import getFileUrl from 'lib/getFileUrl'
import getFileIcon from 'lib/getFileIcon'
import currentFileState from 'state/currentFile'

import styles from 'styles/FileCell.module.scss'

const MAX_PREVIEW_SIZE = 50 * 1024 * 1024 // 50 MB

interface FileCellIconProps {
	file: FileMeta
}

interface FileCellContentProps {
	file: FileMeta
	type: FileType
	isFallback: boolean
}

export interface FileCellProps {
	file: FileMeta
}

const PDF = dynamic(() => import('./PDF'), { ssr: false })

const FileCellIcon = ({ file }: FileCellIconProps) => (
	<FontAwesomeIcon className={styles.icon} icon={getFileIcon(file)} />
)

const FileCellContent = ({ file, type, isFallback }: FileCellContentProps) => {
	if (isFallback)
		return <FileCellIcon file={file} />
	
	switch (type) {
		case FileType.Image:
			return <img className={styles.imageElement} src={getFileUrl(file, true)} alt={file.name} />
		case FileType.Video:
			return (
				<>
					<FontAwesomeIcon className={styles.videoIcon} icon={faVideo} />
					<video className={styles.videoElement}>
						<source src={getFileUrl(file, true)} type={file.type} />
						Video not supported
					</video>
				</>
			)
		case FileType.PDF:
			return <PDF className={styles.document} url={getFileUrl(file, true)} firstPageOnly />
		case FileType.Audio:
		case FileType.Other:
			return <FileCellIcon file={file} />
	}
}

const FileCell = ({ file }: FileCellProps) => {
	const setCurrentFile = useSetRecoilState(currentFileState)
	
	const type = getFileType(file)
	const isFallback = file.size > MAX_PREVIEW_SIZE
	
	const onClick = useCallback(() => {
		setCurrentFile(file)
	}, [file, setCurrentFile])
	
	return (
		<div
			className={cx(styles.root, styles[type], {
				[styles.fallback]: isFallback
			})}
			onClick={onClick}
			role="button"
			title={`View ${file.name}`}
		>
			<FileCellContent file={file} type={type} isFallback={isFallback} />
			<div className={styles.info}>
				<p className={styles.name}>{file.name}</p>
				<div className={styles.comments}>
					<FontAwesomeIcon icon={faComment} />
					<p className={styles.commentCount}>{file.comments}</p>
				</div>
			</div>
		</div>
	)
}

export default FileCell
