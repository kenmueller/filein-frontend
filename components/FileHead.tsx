import Head from 'next/head'

import FileMeta from 'models/FileMeta'
import FileType from 'models/FileType'
import getFileType from 'lib/getFileType'
import getFileUrl from 'lib/getFileUrl'
import { MAX_FILE_PREVIEW_SIZE } from './FilePreview'

export interface FileHeadProps {
	file: FileMeta
}

interface FilePreviewHeadProps {
	file: FileMeta
	type: FileType
	url: string
}

const getPreloadAs = (file: FileMeta, type: FileType) => {
	if (file.size > MAX_FILE_PREVIEW_SIZE)
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

const FilePreviewHead = ({ file, type, url }: FilePreviewHeadProps) => {
	switch (type) {
		case FileType.Image:
			return (
				<Head>
					<meta key="og-image" property="og:image" content={url} />
					<meta key="og-image-secure-url" property="og:image:secure_url" content={url} />
					<meta key="og-image-type" property="og:image:type" content={file.type} />
					<meta key="og-image-alt" property="og:image:alt" content={file.name} />
					<meta key="twitter-image" name="twitter:image" content={url} />
					<meta key="twitter-image-alt" name="twitter:image:alt" content={file.name} />
				</Head>
			)
		case FileType.Video:
			return (
				<Head>
					<meta key="og-video" property="og:video" content={url} />
					<meta key="og-video-secure-url" property="og:video:secure_url" content={url} />
					<meta key="og-video-type" property="og:video:type" content={file.type} />
				</Head>
			)
		case FileType.Audio:
			return (
				<Head>
					<meta key="og-audio" property="og:audio" content={url} />
					<meta key="og-audio-secure-url" property="og:audio:secure_url" content={url} />
					<meta key="og-audio-type" property="og:audio:type" content={file.type} />
				</Head>
			)
		default:
			return null
	}
}

const FileHead = ({ file }: FileHeadProps) => {
	const type = getFileType(file)
	const url = getFileUrl(file, true)
	const preloadAs = getPreloadAs(file, type)
	
	return (
		<>
			{preloadAs && (
				<Head>
					<link key={`${file.id}-preload`} rel="preload" href={url} as={preloadAs} />
				</Head>
			)}
			<FilePreviewHead file={file} type={type} url={url} />
		</>
	)
}

export default FileHead
