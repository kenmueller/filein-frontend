import { SetStateAction } from 'react'
import cx from 'classnames'

import { File } from 'hooks/useFiles'

import styles from 'styles/FileRow.module.scss'

export interface FileRowProps {
	file: File
	setFiles(files: SetStateAction<File[]>): void
}

const FileRow = ({ file, setFiles }: FileRowProps) => {
	return (
		<tr className={styles.root}>
			<td className={cx(styles.icon, {
				[styles.image]: file.image
			})}>
				
			</td>
		</tr>
	)
}

export default FileRow
