import { useCallback } from 'react'
import { useRouter } from 'next/router'
import cx from 'classnames'

import getFilePredicate from 'lib/getFilePredicate'
import useRecentlyUploadedFiles from 'hooks/useRecentlyUploadedFiles'
import Search from './Search'
import FileGrid from './FileGrid'
import FileCell from './FileCell'

import styles from 'styles/RecentlyUploadedFiles.module.scss'

export interface RecentlyUploadedFilesProps {
	className?: string
}

const RecentlyUploadedFiles = ({ className }: RecentlyUploadedFilesProps) => {
	const router = useRouter()
	const files = useRecentlyUploadedFiles()
	const query = (router.query.q ?? '') as string
	
	const setQuery = useCallback((query: string) => {
		router.replace(
			`/${query ? `?q=${encodeURIComponent(query)}` : ''}`,
			undefined,
			{ shallow: true }
		)
	}, [router])
	
	return (
		<div className={cx(styles.root, className)}>
			<Search
				placeholder="Recently uploaded files"
				value={query}
				setValue={setQuery}
			/>
			<FileGrid className={styles.files} loading={!files}>
				{files?.filter(getFilePredicate(query)).map(file => (
					<FileCell key={file.id} file={file} />
				))}
			</FileGrid>
		</div>
	)
}

export default RecentlyUploadedFiles
