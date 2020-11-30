import useCurrentUser from 'hooks/useCurrentUser'
import SignInButton from './SignInButton'

export interface AuthButtonProps {
	className?: string
}

const AuthButton = ({ className }: AuthButtonProps) => {
	const currentUser = useCurrentUser()
	
	return currentUser
		? <p>{currentUser.displayName}</p>
		: <SignInButton className={className} disabled={currentUser === undefined} />
}

export default AuthButton
