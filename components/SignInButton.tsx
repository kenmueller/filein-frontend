import { useCallback } from 'react'
import cx from 'classnames'

import Spinner from './Spinner'

import styles from 'styles/SignInButton.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

export interface SignInButtonProps {
	className?: string
	disabled: boolean
}

const SignInButton = ({ className, disabled }: SignInButtonProps) => {
	const onClick = useCallback(() => {
		
	}, [])
	
	return (
		<button
			className={cx(styles.root, className)}
			disabled={disabled}
			onClick={onClick}
		>
			{disabled
				? <Spinner className={styles.spinner} />
				: (
					<>
						<FontAwesomeIcon icon={faGoogle} />
						<p className={styles.message}>Sign in</p>
					</>
				)
			}
		</button>
	)
}

export default SignInButton
