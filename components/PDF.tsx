import { useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { toast } from 'react-toastify'
import cx from 'classnames'

import Spinner from './Spinner'

import styles from 'styles/PDF.module.scss'

export interface PDFProps {
	className?: string
	url: string
	firstPageOnly?: boolean
}

const PDF = ({ className, url, firstPageOnly = false }: PDFProps) => {
	const [pages, setPages] = useState<number[] | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	
	return (
		<Document
			className={cx(className, { [styles.loading]: isLoading })}
			file={url}
			loading={<Spinner className={styles.spinner} />}
			onLoadSuccess={({ numPages }) => {
				if (!firstPageOnly)
					setPages(Array.from(new Array(numPages).keys()))
				
				setIsLoading(false)
			}}
			onLoadError={({ message }) => {
				setIsLoading(false)
				toast.error(message)
			}}
		>
			{firstPageOnly
				? <Page className={styles.page} pageNumber={1} />
				: pages?.map(page => (
					<Page key={page} className={styles.page} pageNumber={page + 1} />
				))
			}
		</Document>
	)
}

export default PDF
