import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import firebase from 'lib/firebase'
import SignOutButton from './SignOutButton'

import styles from 'styles/AuthDropdownContent.module.scss'

import 'firebase/auth'

export interface AuthDropdownContentProps {
	currentUser: firebase.User
}

const AuthDropdownContent = ({ currentUser }: AuthDropdownContentProps) => (
	<>
		<Link href={`/${currentUser.uid}`}>
			<a className={styles.action}>
				<FontAwesomeIcon icon={faUser} />
				<p className={styles.actionMessage}>My files</p>
			</a>
		</Link>
		<SignOutButton className={cx(styles.action, styles.danger)}>
			<FontAwesomeIcon icon={faSignOutAlt} />
			<p className={styles.actionMessage}>Sign out</p>
		</SignOutButton>
	</>
)

export const authDropdownContentClassName = styles.root
export default AuthDropdownContent
