import FileMeta from 'models/FileMeta'

const isFileImage = (file: FileMeta) =>
	file.type.startsWith('image/')

export default isFileImage
