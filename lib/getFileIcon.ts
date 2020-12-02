import { faCode, faFile, faFileAlt, faFileArchive, faFileCsv, faFileExcel, faFilePdf, faFilePowerpoint, faFileWord, faVideo, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

import FileMeta from 'models/FileMeta'

const getFileIcon = ({ type }: FileMeta) => {
	switch (type) {
		case 'application/pdf':
			return faFilePdf
		case 'application/rtf':
			return faFileAlt
		case 'text/html':
		case 'text/css':
		case 'text/javascript':
		case 'application/json':
		case 'application/ld+json':
		case 'application/java-archive':
		case 'application/xhtml+xml':
		case 'application/xml':
		case 'text/xml':
			return faCode
		case 'text/csv':
			return faFileCsv
		case 'application/msword':
		case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
			return faFileWord
		case 'application/vnd.ms-powerpoint':
		case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
			return faFilePowerpoint
		case 'application/vnd.ms-excel':
		case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
			return faFileExcel
		case 'application/zip':
		case 'application/gzip':
		case 'application/vnd.rar':
		case 'application/x-tar':
			return faFileArchive
	}
	
	if (type.startsWith('text/') || type.startsWith('font/')) return faFileAlt
	if (type.startsWith('audio/')) return faVolumeUp
	if (type.startsWith('video/')) return faVideo
	
	return faFile
}

export default getFileIcon
