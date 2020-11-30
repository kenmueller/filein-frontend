import FileMeta from 'models/FileMeta'
import normalize from 'lib/normalize'

const getFilePredicate = (query: string) => {
	const characters = normalize(query).split('')
	
	return (file: FileMeta) => {
		const name = file.name.toLowerCase()
		
		for (const character of characters)
			if (!name.includes(character))
				return false
		
		return true
	}
}

export default getFilePredicate
