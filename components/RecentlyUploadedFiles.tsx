import getFileUrl from 'lib/getFileUrl'
import useRecentlyUploadedFiles from 'hooks/useRecentlyUploadedFiles'
import Spinner from './Spinner'

import styles from 'styles/RecentlyUploadedFiles.module.scss'

export interface RecentlyUploadedFilesProps {
	className?: string
}

const RecentlyUploadedFiles = ({ className }: RecentlyUploadedFilesProps) => {
	const files = useRecentlyUploadedFiles()
	
	return (
		<div className={className}>
			<p className={styles.label}>recently uploaded</p>
			<div className={styles.files}>
				{files
					? files.map(file => (
						<a key={file.id} className={styles.file} href={getFileUrl(file)}>
							<p className={styles.fileName}>{file.name}</p>
						</a>
					))
					: <Spinner className={styles.spinner} />
				}
			</div>
		</div>
	)
}

export default RecentlyUploadedFiles
