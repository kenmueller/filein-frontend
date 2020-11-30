import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import firebase from 'lib/firebase'

import styles from 'styles/AuthDropdownTrigger.module.scss'

import 'firebase/auth'

export interface AuthDropdownTriggerProps {
	currentUser: firebase.User
}

const AuthDropdownTrigger = ({ currentUser }: AuthDropdownTriggerProps) => (
	<>
		<p className={styles.name}>{currentUser.displayName}</p>
		<FontAwesomeIcon icon={faChevronDown} />
	</>
)

export const authDropdownTriggerClassName = styles.root
export default AuthDropdownTrigger
