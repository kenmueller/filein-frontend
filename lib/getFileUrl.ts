import FileMeta from 'models/FileMeta'

const getFileUrl = (file: FileMeta) =>
	`https://u.filein.io/${file.id}`

export default getFileUrl
