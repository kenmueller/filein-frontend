import { ChangeEvent, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import styles from 'styles/Search.module.scss'

export interface SearchProps {
	className?: string
	placeholder: string
	value: string
	setValue(value: string): void
}

const Search = ({ className, placeholder, value, setValue }: SearchProps) => {
	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}, [setValue])
	
	return (
		<div className={cx(styles.root, className)}>
			<input
				className={styles.input}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			<FontAwesomeIcon className={styles.icon} icon={faSearch} />
		</div>
	)
}

export default Search
