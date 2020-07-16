import useFiles from 'hooks/useFiles'

import styles from 'styles/FileList.module.scss'

const FileList = () => {
	const files = useFiles()
	
	return (
		<table className={styles.root}>
			<tbody>
				
			</tbody>
		</table>
	)
}

export default FileList
