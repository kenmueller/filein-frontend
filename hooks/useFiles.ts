import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'

import firebase from 'lib/firebase'
import snapshotToFileMeta from 'lib/snapshotToFileMeta'
import filesState from 'state/files'

import 'firebase/firestore'

const firestore = firebase.firestore()
const queue = new Set<string>()

const useFiles = (uid: string) => {
	const [files, setFiles] = useRecoilState(filesState)
	
	useEffect(() => {
		if (queue.has(uid))
			return
		
		queue.add(uid)
		
		firestore.collection('files').where('owner', '==', uid).onSnapshot(
			snapshot => {
				setFiles(_files => {
					let files = _files[uid] ?? []
					
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
					
					return { ..._files, [uid]: files }
				})
			},
			({ message }) => toast.error(message)
		)
	}, [uid, setFiles])
	
	return files[uid]
}

export default useFiles
