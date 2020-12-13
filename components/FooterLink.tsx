import { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

import styles from 'styles/FooterLink.module.scss'

export interface FooterLinkProps {
	href: string
	icon: IconDefinition
	children?: ReactNode
}

const FooterLink = ({ href, icon, children }: FooterLinkProps) => (
	<a
		className={styles.root}
		href={href}
		rel="noopener noreferrer"
		target="_blank"
	>
		<FontAwesomeIcon className={styles.icon} icon={icon} />
		<span>{children}</span>
	</a>
)

export default FooterLink
