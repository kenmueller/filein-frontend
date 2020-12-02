import FileMeta from 'models/FileMeta'

const getFileUrl = (file: FileMeta, secure: boolean = false) =>
	`http${secure ? 's' : ''}://u.filein.io/${file.id}`

export default getFileUrl
