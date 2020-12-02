import { useMemo } from 'react'
import NextHead from 'next/head'

const DEFAULT_DATA = [
	{
		'@type': 'WebSite',
		url: 'https://filein.io',
		name: 'filein',
		description: 'The best way to share files',
		inLanguage: 'en-US'
	}
]

export interface HeadProps {
	url: string
	image: string
	title: string
	description: string
	data?: any[]
}

const Head = ({ url, image, title, description, data = [] }: HeadProps) => {
	const html = useMemo(() => ({
		__html: JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [...DEFAULT_DATA, ...data]
		})
	}), [data])
	
	return (
		<NextHead>
			<link key="canonical" rel="canonical" href={url} />
			<meta key="description" name="description" content={description} />
			<meta key="og-url" property="og:url" content={url} />
			<meta key="og-image" property="og:image" content={image} />
			<meta key="og-title" property="og:title" content={title} />
			<meta key="og-description" property="og:description" content={description} />
			<meta key="twitter-image" name="twitter:image" content={image} />
			<meta key="twitter-title" name="twitter:title" content={title} />
			<meta key="twitter-description" name="twitter:description" content={description} />
			<script key="data" type="application/ld+json" dangerouslySetInnerHTML={html} />
			<title key="title">{title}</title>
		</NextHead>
	)
}

export default Head
