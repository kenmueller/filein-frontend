import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons'

import currentFileState from 'state/currentFile'
import useUser from 'hooks/useUser'
import Modal from './Modal'
import FilePreview from './FilePreview'
import Spinner from './Spinner'

import styles from 'styles/CurrentFile.module.scss'

const CurrentFile = () => {
	const [file, setFile] = useRecoilState(currentFileState)
	const user = useUser(file?.owner)
	
	const setIsShowing = useCallback((isShowing: boolean) => {
		setFile(file => isShowing ? file : null)
	}, [setFile])
	
	const hide = useCallback(() => {
		setFile(null)
	}, [setFile])
	
	useEffect(() => {
		
	}, [])
	
	return (
		<Modal className={styles.root} isShowing={file !== null} setIsShowing={setIsShowing}>
			<header className={styles.header}>
				<p className={styles.headerName}>{file?.name}</p>
				<button className={styles.close} onClick={hide}>
					<FontAwesomeIcon className={styles.closeIcon} icon={faTimes} />
				</button>
			</header>
			<div className={styles.content}>
				{file && (
					<>
						<FilePreview className={styles.preview} file={file} />
						<div className={styles.info}>
							<div className={styles.meta}>
								<p className={styles.name}>{file.name}</p>
								<p className={styles.user}>
									Uploaded by {user
										? (
											<Link href={`/${user.slug}`}>
												<a className={styles.userLink}>
													<p className={styles.userName}>{user.name}</p>
													<FontAwesomeIcon icon={faChevronRight} />
												</a>
											</Link>
										)
										: <Spinner className={styles.spinner} />
									}
								</p>
							</div>
							<div className={styles.actions}>
								
							</div>
						</div>
					</>
				)}
			</div>
		</Modal>
	)
}

export default CurrentFile
