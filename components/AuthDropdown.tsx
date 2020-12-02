import { useState, useCallback } from 'react'

import firebase from 'lib/firebase'
import Dropdown from './Dropdown'
import AuthDropdownTrigger, { authDropdownTriggerClassName } from './AuthDropdownTrigger'
import AuthDropdownContent, { authDropdownContentClassName } from './AuthDropdownContent'

import 'firebase/auth'

export interface AuthDropdownProps {
	className?: string
	currentUser: firebase.User
}

const AuthDropdown = ({ className, currentUser }: AuthDropdownProps) => {
	const [isShowing, setIsShowing] = useState(false)
	
	const hide = useCallback(() => {
		setIsShowing(false)
	}, [setIsShowing])
	
	return (
		<Dropdown
			isShowing={isShowing}
			setIsShowing={setIsShowing}
			rootClassName={className}
			triggerClassName={authDropdownTriggerClassName}
			contentClassName={authDropdownContentClassName}
			trigger={<AuthDropdownTrigger currentUser={currentUser} />}
		>
			<AuthDropdownContent currentUser={currentUser} onClick={hide} />
		</Dropdown>
	)
}

export default AuthDropdown
