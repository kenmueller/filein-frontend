import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import cx from 'classnames'

import useSignIn from 'hooks/useSignIn'
import Spinner from './Spinner'

import styles from 'styles/SignInButton.module.scss'

export interface SignInButtonProps {
	className?: string
	disabled: boolean
}

const SignInButton = ({ className, disabled }: SignInButtonProps) => {
	const signIn = useSignIn()
	const [isLoading, setIsLoading] = useState(false)
	
	const onClick = useCallback(async () => {
		if (disabled || isLoading)
			return
		
		setIsLoading(true)
		
		try {
			if (!await signIn())
				setIsLoading(false)
		} catch ({ message }) {
			setIsLoading(false)
			toast.error(message)
		}
	}, [disabled, isLoading, signIn, setIsLoading])
	
	return (
		<button
			className={cx(styles.root, className)}
			disabled={disabled || isLoading}
			onClick={onClick}
		>
			{disabled || isLoading
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
