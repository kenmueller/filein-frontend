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
		
		firestore
			.collection('files')
			.orderBy('uploaded', 'desc')
			.limit(50)
			.onSnapshot(
				snapshot => {
					setFiles(_files => {
						let files = _files ?? []
						
						for (const { type, doc } of snapshot.docChanges())
							switch (type) {
								case 'added': {
									const file = snapshotToFileMeta(doc)
									
									if (file)
										files = [...files, file]
									
									break
								}
								case 'modified':
									files = files.map(file =>
										file.id === doc.id
											? snapshotToFileMeta(doc) ?? file
											: file
									)
									break
								case 'removed':
									files = files.filter(({ id }) => id !== doc.id)
									break
							}
						
						return files.sort((a, b) => b.uploaded - a.uploaded)
					})
				},
				({ message }) => toast.error(message)
			)
	}, [files, setFiles])
	
	return files
}

export default useRecentlyUploadedFiles
