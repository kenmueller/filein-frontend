import { ReactNode, useState, useCallback } from 'react'
import { toast } from 'react-toastify'

import signOut from 'lib/signOut'

export interface SignOutButtonProps {
	className?: string
	children?: ReactNode
}

const SignOutButton = (props: SignOutButtonProps) => {
	const [isLoading, setIsLoading] = useState(false)
	
	const onClick = useCallback(async () => {
		if (isLoading)
			return
		
		try {
			setIsLoading(true)
			await signOut()
		} catch ({ message }) {
			setIsLoading(false)
			toast.error(message)
		}
	}, [isLoading, setIsLoading])
	
	return (
		<button {...props} disabled={isLoading} onClick={onClick} />
	)
}

export default SignOutButton
