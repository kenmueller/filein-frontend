import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'

import firebase from 'lib/firebase'
import snapshotToFileMeta from 'lib/snapshotToFileMeta'
import recentlyUploadedFilesState from 'state/recentlyUploadedFiles'

import 'firebase/firestore'

const firestore = firebase.firestore()

const useRecentlyUploadedFiles = () => {
	const [files, setFiles] = useRecoilState(recentlyUploadedFilesState)
	
	useEffect(() => {
		if (files !== undefined)
			return
		
		setFiles(null)
		
		firestore.collection('files').limit(50).onSnapshot(
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
	}, [files, setFiles])
	
	return files
}

export default useRecentlyUploadedFiles
