import { SetStateAction } from 'react'

import { File } from 'hooks/useFiles'
import FileRow from './FileRow'

import styles from 'styles/FileList.module.scss'

export interface FileListProps {
	files: File[]
	setFiles(files: SetStateAction<File[]>): void
}

const FileList = ({ files, setFiles }: FileListProps) => (
	<table className={styles.root}>
		<tbody>
			{files.map(file => (
				<FileRow
					key={file.id}
					file={file}
					setFiles={setFiles}
				/>
			))}
		</tbody>
	</table>
)

export default FileList
