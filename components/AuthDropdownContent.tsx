import { forwardRef, useCallback } from 'react'
import Link from 'next/link'
import copy from 'copy-to-clipboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt, faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import cx from 'classnames'

import CurrentUser from 'models/CurrentUser'
import EditUserName from './EditUserName'
import SignOutButton from './SignOutButton'

import styles from 'styles/AuthDropdownContent.module.scss'

export interface AuthDropdownContentMyFilesActionProps {
	href?: string
	onClick: (() => void) | undefined
}

export interface AuthDropdownContentProps {
	currentUser: CurrentUser
	onClick?(): void
}

const AuthDropdownContentMyFilesAction = forwardRef(({ href, onClick }: AuthDropdownContentMyFilesActionProps, _ref) => (
	<a className={cx(styles.row, styles.action)} href={href} onClick={onClick} aria-disabled={!href}>
		<FontAwesomeIcon icon={faUser} />
		<span className={styles.actionMessage}>My files</span>
	</a>
))

const AuthDropdownContent = ({ currentUser, onClick }: AuthDropdownContentProps) => {
	const { data } = currentUser
	const apiKey = data?.apiKey
	
	const copyApiKey = useCallback(() => {
		copy(apiKey)
		toast.success('Copied your API key to clipboard')
	}, [apiKey])
	
	return (
		<>
			<EditUserName className={styles.row} user={currentUser} />
			{data
				? (
					<Link href={`/u/${data.slug}`} passHref>
						<AuthDropdownContentMyFilesAction onClick={onClick} />
					</Link>
				)
				: <AuthDropdownContentMyFilesAction onClick={onClick} />
			}
			<button className={cx(styles.row, styles.action)} disabled={!apiKey} onClick={copyApiKey}>
				<FontAwesomeIcon icon={faShareSquare} />
				<span className={cx(styles.actionMessage, styles.copyApiKeyMessage)}>Copy API key</span>
			</button>
			<SignOutButton className={cx(styles.row, styles.action, styles.danger)} onClick={onClick}>
				<FontAwesomeIcon icon={faSignOutAlt} />
				<span className={styles.actionMessage}>Sign out</span>
			</SignOutButton>
		</>
	)
}

export const authDropdownContentClassName = styles.root
export default AuthDropdownContent
