import FileMeta from 'models/FileMeta'

const getFileUrl = (file: FileMeta, secure: boolean = false) =>
	`${secure ? 'https://storage.googleapis.com/' : 'http://'}u.filein.io/${file.id}`

export default getFileUrl
