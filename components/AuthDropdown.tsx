import { useState, useCallback } from 'react'

import CurrentUser from 'models/CurrentUser'
import Dropdown from './Dropdown'
import AuthDropdownTrigger, { authDropdownTriggerClassName } from './AuthDropdownTrigger'
import AuthDropdownContent, { authDropdownContentClassName } from './AuthDropdownContent'

export interface AuthDropdownProps {
	className?: string
	currentUser: CurrentUser
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
