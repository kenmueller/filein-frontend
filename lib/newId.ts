import { nanoid } from 'nanoid'

const ID_LENGTH = 10

const newId = () =>
	nanoid(ID_LENGTH)

export default newId
