import { SVGProps } from 'react'
import cx from 'classnames'

import styles from 'styles/ProgressCircle.module.scss'

export interface ProgressCircleProps extends SVGProps<SVGSVGElement> {
	className?: string
	value: number
}

const ProgressCircle = ({ className, value, ...props }: ProgressCircleProps) => {
	const determinant = value * 2.64
	
	return (
		<svg className={cx(styles.root, className)} viewBox="0 0 100 100" {...props}>
			<circle className={styles.track} cx={50} cy={50} r={42} />
			<circle
				className={styles.thumb}
				cx={50}
				cy={50}
				r={42}
				strokeDasharray={`${determinant} ${264 - determinant}`}
			/>
			<text
				className={styles.value}
				x={50}
				y={50}
				textAnchor="middle"
				dominantBaseline="middle"
			>
				{Math.floor(value)}%
			</text>
		</svg>
	)
}

export default ProgressCircle
