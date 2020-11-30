import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import firebase from 'lib/firebase'
import SignOutButton from './SignOutButton'

import styles from 'styles/AuthDropdownContent.module.scss'

import 'firebase/auth'

export interface AuthDropdownContentProps {
	currentUser: firebase.User
}

const AuthDropdownContent = ({ currentUser }: AuthDropdownContentProps) => (
	<>
		<SignOutButton>
			<FontAwesomeIcon icon={faSignOutAlt} />
			<p>Sign out</p>
		</SignOutButton>
	</>
)

export default AuthDropdownContent
