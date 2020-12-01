import FileMeta from 'models/FileMeta'

const getFileUrl = (file: FileMeta) =>
	`http://u.filein.io/${file.id}`

export default getFileUrl
