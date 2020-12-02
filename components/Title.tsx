import { ReactNode } from 'react'
import Head from 'next/head'

export interface TitleProps {
	children: ReactNode
}

const Title = ({ children }: TitleProps) => (
	<Head>
		<title key="title">{children}</title>
	</Head>
)

export default Title
