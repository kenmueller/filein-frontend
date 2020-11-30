import useCurrentUser from 'hooks/useCurrentUser'
import AuthDropdown from './AuthDropdown'
import SignInButton from './SignInButton'

export interface AuthButtonProps {
	className?: string
}

const AuthButton = ({ className }: AuthButtonProps) => {
	const currentUser = useCurrentUser()
	
	return currentUser
		? <AuthDropdown className={className} currentUser={currentUser} />
		: <SignInButton className={className} disabled={currentUser === undefined} />
}

export default AuthButton
