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
	title: string
	description: string
	data?: any[]
	storagePreconnect?: boolean
}

const Head = ({
	url,
	title,
	description,
	data = [],
	storagePreconnect = true
}: HeadProps) => {
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
			<meta key="og-title" property="og:title" content={title} />
			<meta key="og-description" property="og:description" content={description} />
			<meta key="twitter-title" name="twitter:title" content={title} />
			<meta key="twitter-description" name="twitter:description" content={description} />
			<script key="data" type="application/ld+json" dangerouslySetInnerHTML={html} />
			<title key="title">{title}</title>
			
			<link key="firestore-preconnect" rel="preconnect" href="https://firestore.googleapis.com" />
			{storagePreconnect && <link key="storage-preconnect" rel="preconnect" href="https://storage.googleapis.com" />}
		</NextHead>
	)
}

export default Head
