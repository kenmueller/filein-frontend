declare namespace Filein {
	interface File {
		id: string
		url: string
		data: Buffer
	}
}

interface Filein {
	/** Download a file with the given ID */
	(id: string): Promise<Filein.File>
	
	/**
	 * Upload a file with the given data.
	 * 
	 * @param data The data of the file.
	 * @param contentType Optionally include a fallback Content-Type
	 * header if the content type couldn't be detected automatically.
	 * 
	 * @returns The new file
	 */
	upload(data: Buffer, contentType?: string | null | undefined): Promise<Filein.File>
	
	/** Download a file with the given ID */
	download(id: string): Promise<Filein.File>
	
	/** Convert a file ID to a file URL */
	idToUrl(id: string): string
	
	/** Convert a file URL to a file ID */
	urlToId(url: string): string | null
}

export = Filein
