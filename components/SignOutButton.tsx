import { ReactNode, useState, useCallback } from 'react'
import { toast } from 'react-toastify'

import signOut from 'lib/signOut'

export interface SignOutButtonProps {
	className?: string
	onClick?(): void
	children?: ReactNode
}

const SignOutButton = ({ className, onClick: _onClick, children }: SignOutButtonProps) => {
	const [isLoading, setIsLoading] = useState(false)
	
	const onClick = useCallback(async () => {
		if (isLoading)
			return
		
		try {
			_onClick()
			
			setIsLoading(true)
			await signOut()
		} catch ({ message }) {
			setIsLoading(false)
			toast.error(message)
		}
	}, [isLoading, setIsLoading, _onClick])
	
	return (
		<button className={className} disabled={isLoading} onClick={onClick}>
			{children}
		</button>
	)
}

export default SignOutButton
