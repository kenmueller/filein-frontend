import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'

import firebase from 'lib/firebase'
import snapshotToFileMeta from 'lib/snapshotToFileMeta'
import filesState from 'state/files'
import useCurrentUser from './useCurrentUser'

import 'firebase/firestore'

const firestore = firebase.firestore()
const queue = new Set<string>()

const useFiles = (owner: string) => {
	const [files, setFiles] = useRecoilState(filesState)
	
	const currentUser = useCurrentUser()
	const uid = currentUser && (currentUser.auth?.uid ?? currentUser.data?.id)
	
	useEffect(() => {
		if (uid === undefined || queue.has(owner))
			return
		
		queue.add(owner)
		
		let query = firestore.collection('files').where('owner', '==', owner)
		
		if (uid !== owner)
			query = query.where('public', '==', true)
		
		query.onSnapshot(
			snapshot => {
				setFiles(_files => {
					let files = _files[owner] ?? []
					
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
					
					return {
						..._files,
						[owner]: files.sort((a, b) => b.uploaded - a.uploaded)
					}
				})
			},
			({ message }) => toast.error(message)
		)
	}, [uid, owner, setFiles])
	
	return files[owner]
}

export default useFiles
