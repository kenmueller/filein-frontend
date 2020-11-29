import useCurrentUser from 'hooks/useCurrentUser'

export interface AuthButtonProps {
	className?: string
}

const AuthButton = ({ className }: AuthButtonProps) => {
	const currentUser = useCurrentUser()
	
	return <p>{currentUser?.displayName ?? 'not signed in'}</p>
}

export default AuthButton
