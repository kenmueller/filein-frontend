import { SetStateAction, useState, useMemo } from 'react'
import Link from 'next/link'
import cx from 'classnames'

import { File } from 'hooks/useFiles'
import Search from './Search'
import FileRow from './FileRow'

import styles from 'styles/FileList.module.scss'

export interface FileListProps {
	className?: string
	files: File[]
	setFiles(files: SetStateAction<File[]>): void
}

const normalize = (str: string) =>
	str.toLowerCase().replace(/\s+/g, '')

const FileList = ({ className, files, setFiles }: FileListProps) => {
	const [query, setQuery] = useState('')
	
	const filteredFiles = useMemo(() => (
		files.filter(({ name }) =>
			normalize(name).includes(normalize(query))
		)
	), [files, query])
	
	return (
		<div className={cx(styles.root, className)}>
			<Search
				className={styles.search}
				placeholder="Search"
				value={query}
				setValue={setQuery}
			/>
			{filteredFiles.length
				? filteredFiles.map(file => (
					<FileRow
						key={file.id}
						file={file}
						setFiles={setFiles}
					/>
				))
				: (
					<Link href="/">
						<a className={styles.noFilesMessage}>
							Nothing here!
						</a>
					</Link>
				)
			}
		</div>
	)
}

export default FileList
