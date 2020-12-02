import FileMeta from 'models/FileMeta'
import FileType from 'models/FileType'

const getFileType = ({ type }: FileMeta) => {
	if (type.startsWith('image/')) return FileType.Image
	if (type.startsWith('video/')) return FileType.Video
	if (type.startsWith('audio/')) return FileType.Audio
	if (type === 'application/pdf') return FileType.PDF
	
	return FileType.Other
}

export default getFileType
