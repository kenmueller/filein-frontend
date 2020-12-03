const NAME_REGEX = /^(.+)\./
const EXTENSION_REGEX = /\.([^\.]+)$/

const getName = (file: string) =>
	file.match(NAME_REGEX)?.[1] ?? file

const getExtension = (file: string) =>
	file.match(EXTENSION_REGEX)?.[1].toLowerCase()

const normalizeExtension = (from: string, to: string) => {
	const fromExtension = getExtension(from)
	const toName = getName(to)
	const toExtension = getExtension(to)
	
	return `${toName}${
		fromExtension
			? `.${fromExtension}`
			: toExtension ? `.${toExtension}` : ''
	}`
}

export default normalizeExtension
