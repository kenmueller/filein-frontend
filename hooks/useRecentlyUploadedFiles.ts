import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'

import firebase from 'lib/firebase'
import snapshotToFileMeta from 'lib/snapshotToFileMeta'
import { RECENTLY_UPLOADED_FILES_LIMIT } from 'lib/constants'
import recentlyUploadedFilesState from 'state/recentlyUploadedFiles'
import useCurrentUser from './useCurrentUser'

import 'firebase/firestore'

const firestore = firebase.firestore()

const useRecentlyUploadedFiles = () => {
	const [files, setFiles] = useRecoilState(recentlyUploadedFilesState)
	
	const currentUser = useCurrentUser()
	const uid = currentUser && (currentUser.auth?.uid ?? currentUser.data?.id)
	
	useEffect(() => {
		if (uid === undefined || files !== undefined)
			return
		
		setFiles(null)
		
		firestore
			.collection('files')
			.orderBy('uploaded', 'desc')
			.limit(RECENTLY_UPLOADED_FILES_LIMIT)
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
								case 'modified': {
									const newFile = snapshotToFileMeta(doc)
									
									if (!newFile)
										break
									
									const hasFile = files.some(({ id }) => id === newFile.id)
									
									files = hasFile
										? files.map(file =>
											file.id === newFile.id ? newFile : file
										)
										: [...files, newFile]
									
									break
								}
								case 'removed':
									files = files.filter(({ id }) => id !== doc.id)
									break
							}
						
						return files
							.filter(file => file.public || file.owner === uid)
							.sort((a, b) => b.uploaded - a.uploaded)
					})
				},
				({ message }) => toast.error(message)
			)
	}, [uid, files, setFiles])
	
	return files
}

export default useRecentlyUploadedFiles
