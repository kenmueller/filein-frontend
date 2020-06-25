const Filein = require('../lib')

it('uploads files', async () => {
	const data = Buffer.from('I am some text')
	const file = await Filein.upload(data)
	
	expect(Filein.idToUrl(file.id)).toBe(file.url)
	expect(Filein.urlToId(file.url)).toBe(file.id)
	expect(data.compare(file.data)).toBe(0)
	
	const downloadedFile = await Filein.download(file.id)
	
	expect(file.id).toBe(downloadedFile.id)
	expect(file.url).toBe(downloadedFile.url)
	expect(file.data.compare(downloadedFile.data)).toBe(0)
})

it('converts IDs to URLs', () => {
	expect(Filein.idToUrl('abc')).toBe('https://storage.googleapis.com/file-in.appspot.com/files/abc')
})

it('converts URLs to IDs', () => {
	expect(Filein.urlToId('https://storage.googleapis.com/file-in.appspot.com/files/abc')).toBe('abc')
})
