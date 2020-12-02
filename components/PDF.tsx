import { useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import cx from 'classnames'
import Spinner from './Spinner'

import styles from 'styles/PDF.module.scss'
import { toast } from 'react-toastify'

export interface PDFProps {
	className?: string
	url: string
	page?: number
}

const PDF = ({ className, url, page }: PDFProps) => {
	const [pages, setPages] = useState<number[] | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	
	return (
		<Document
			className={cx(className, { [styles.loading]: isLoading })}
			file={url}
			loading={<Spinner className={styles.spinner} />}
			onLoadSuccess={({ numPages }) => {
				setPages(Array.from(new Array(numPages).keys()))
				setIsLoading(false)
			}}
			onLoadError={({ message }) => {
				setIsLoading(false)
				toast.error(message)
			}}
		>
			{page
				? <Page className={styles.page} pageNumber={page} />
				: pages?.map(page => (
					<Page key={page} className={styles.page} pageNumber={page + 1} />
				))
			}
		</Document>
	)
}

export default PDF
