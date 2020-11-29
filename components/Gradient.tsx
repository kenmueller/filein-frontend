import { PropsWithChildren } from 'react'
import cx from 'classnames'

import styles from 'styles/Gradient.module.scss'

export interface GradientProps extends PropsWithChildren<{}> {
	className?: string
}

const Gradient = ({ className, children }: GradientProps) => (
	<div className={styles.root}>
		<div className={styles.background} />
		<div className={cx(styles.foreground, className)}>
			{children}
		</div>
	</div>
)

export default Gradient
