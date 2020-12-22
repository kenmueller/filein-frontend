export default interface User {
	id: string
	slug: string
	apiKey?: string | null
	name: string
	files: number
	comments: number
}
