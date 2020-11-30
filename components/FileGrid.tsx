import { ReactNode } from 'react'
import cx from 'classnames'

import Spinner from './Spinner'

import styles from 'styles/FileGrid.module.scss'

export interface FilesProps {
	className?: string
	loading: boolean
	children?: ReactNode
}

const FileGrid = ({ className, loading, children }: FilesProps) => (
	<div className={cx(styles.root, className, {
		[styles.loading]: loading
	})}>
		{loading
			? <Spinner className={styles.spinner} />
			: children
		}
	</div>
)

export default FileGrid
