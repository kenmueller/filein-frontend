import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import FileMeta from 'models/FileMeta'
import firebase from 'lib/firebase'
import snapshotToFileMeta from 'lib/snapshotToFileMeta'

import 'firebase/firestore'

const firestore = firebase.firestore()

const useRecentlyUploadedFiles = (limit: number = 50) => {
	const [files, setFiles] = useState<FileMeta[] | null>(null)
	
	useEffect(() => (
		firestore.collection('files').limit(limit).onSnapshot(
			snapshot => {
				setFiles(files => files ?? [])
				
				for (const { type, doc } of snapshot.docChanges())
					switch (type) {
						case 'added': {
							const file = snapshotToFileMeta(doc)
							
							if (file)
								setFiles(files => [...files, file])
							
							break
						}
						case 'modified':
							setFiles(files => files.map(file =>
								file.id === doc.id
									? snapshotToFileMeta(doc) ?? file
									: file
							))
							break
						case 'removed':
							setFiles(files => files.filter(({ id }) => id !== doc.id))
							break
					}
			},
			({ message }) => toast.error(message)
		)
	), [limit, setFiles])
	
	return files
}

export default useRecentlyUploadedFiles
