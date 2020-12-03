export default interface FileMeta {
	id: string
	name: string
	type: string
	size: number
	owner: string | null
	comments: number
	uploaded: number
	public: boolean
}
