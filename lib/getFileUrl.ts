import FileMeta from 'models/FileMeta'

const getFileUrl = (file: FileMeta) =>
	`https://storage.googleapis.com/file-in.appspot.com/files/${file.id}`

export default getFileUrl
