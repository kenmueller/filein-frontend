import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as FileType from 'file-type'
import { v4 as uuid } from 'uuid'
import { nanoid } from 'nanoid'

const DEFAULT_CONTENT_TYPE = 'application/octet-stream'
const ID_LENGTH = 10

const storage = admin.storage().bucket()
const app = express()

export default functions.https.onRequest(app)

app.use(({ headers }, _, next) => {
	headers['content-type'] = headers['content-type'] ?? DEFAULT_CONTENT_TYPE
	next()
})

app.use(cors())
app.use(bodyParser.raw({
	limit: 10 * 1024 * 1024 * 1024 // 10 GB limit
}))

app.get('/download/:id', async ({ params: { id } }, res) => {
	try {
		const file = storage.file(`files/${id}`)
		
		const [[{ contentType }], [data]] =
			await Promise.all([
				file.getMetadata(),
				file.download()
			])
		
		res
			.header('Content-Type', contentType)
			.header('Cache-Control', 'public, max-age=31536000, s-maxage=31536000')
			.send(data)
	} catch (error) {
		console.error(error)
		res.status(500).json(error)
	}
})

app.post('/upload', async ({ body, headers }, res) => {
	try {
		if (!(body instanceof Buffer)) {
			res.status(400).send('The request body must be raw data')
			return
		}
		
		const id = nanoid(ID_LENGTH)
		
		await storage.file(`files/${id}`).save(body, {
			public: true,
			contentType: (await FileType.fromBuffer(body))?.mime ?? headers['content-type'],
			metadata: {
				cacheControl: 'public, max-age=31536000, s-maxage=31536000',
				metadata: {
					firebaseStorageDownloadTokens: uuid(),
					size: body.length
				}
			}
		})
		
		res.send(`https://storage.googleapis.com/file-in.appspot.com/files/${id}`)
	} catch (error) {
		res.status(500).json(error)
	}
})
