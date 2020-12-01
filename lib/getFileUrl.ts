import FileMeta from 'models/FileMeta'

const getFileUrl = (file: FileMeta) =>
	`https://storage.googleapis.com/file-in.appspot.com/${file.id}`

export default getFileUrl
