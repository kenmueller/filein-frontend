import Head from 'next/head'

import FileMeta from 'models/FileMeta'
import FileType from 'models/FileType'
import getFileUrl from 'lib/getFileUrl'

export interface FilePreloadProps {
	file: FileMeta
	type: FileType
	maxSize: number
}

const getAs = (file: FileMeta, type: FileType, maxSize: number) => {
	if (file.size > maxSize)
		return null
	
	switch (type) {
		case FileType.Image:
			return 'image'
		case FileType.Video:
			return 'video'
		case FileType.Audio:
			return 'audio'
		case FileType.PDF:
			return 'fetch'
		case FileType.Other:
			return null
	}
}

const FilePreload = ({ file, type, maxSize }: FilePreloadProps) => {
	const as = getAs(file, type, maxSize)
	
	if (!as)
		return null
	
	return (
		<Head>
			<link
				key={`${file.id}-preload`}
				rel="preload"
				href={getFileUrl(file, true)}
				as={as}
			/>
		</Head>
	)
}

export default FilePreload
