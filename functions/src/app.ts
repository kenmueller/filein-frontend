import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'

const storage = admin.storage().bucket()
const app = express()

export default functions.https.onRequest(app)

app.use(cors())

app.get('/:id', async ({ params: { id } }, res) => {
	try {
		const file = storage.file(`files/${id}`)
		
		const [[metadata], [data]] = await Promise.all([
			file.getMetadata(),
			file.download()
		])
		
		console.log(JSON.stringify(metadata))
		
		res.send(data)
	} catch (error) {
		res.status(404).send(error)
	}
})

app.get('*', (_, res) =>
	res.status(404).redirect('/')
)
