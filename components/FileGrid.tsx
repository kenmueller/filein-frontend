import { ReactNode } from 'react'
import cx from 'classnames'

import styles from 'styles/FileGrid.module.scss'

export interface FilesProps {
	className?: string
	children?: ReactNode
}

const FileGrid = ({ className, children }: FilesProps) => (
	<div className={cx(styles.root, className)}>{children}</div>
)

export default FileGrid
