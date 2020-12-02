import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import CurrentUser from 'models/CurrentUser'

import styles from 'styles/AuthDropdownTrigger.module.scss'

export interface AuthDropdownTriggerProps {
	currentUser: CurrentUser
}

const AuthDropdownTrigger = ({ currentUser }: AuthDropdownTriggerProps) => (
	<>
		<p className={styles.name}>
			{currentUser.data?.name ?? currentUser.auth?.displayName}
		</p>
		<FontAwesomeIcon icon={faChevronDown} />
	</>
)

export const authDropdownTriggerClassName = styles.root
export default AuthDropdownTrigger
