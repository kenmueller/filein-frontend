import { SetStateAction, useState, useMemo } from 'react'

import { File } from 'hooks/useFiles'
import Search from './Search'
import FileRow from './FileRow'

import styles from 'styles/FileList.module.scss'

export interface FileListProps {
	files: File[]
	setFiles(files: SetStateAction<File[]>): void
}

const normalize = (str: string) =>
	str.toLowerCase().replace(/\s+/g, '')

const FileList = ({ files, setFiles }: FileListProps) => {
	const [query, setQuery] = useState('')
	
	const filteredFiles = useMemo(() => (
		files.filter(({ name }) =>
			normalize(name).includes(normalize(query))
		)
	), [files, query])
	
	return (
		<div>
			<Search
				className={styles.search}
				placeholder="Search"
				value={query}
				setValue={setQuery}
			/>
			{filteredFiles.map(file => (
				<FileRow
					key={file.id}
					file={file}
					setFiles={setFiles}
				/>
			))}
		</div>
	)
}

export default FileList
