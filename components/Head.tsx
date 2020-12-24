import NextHead from 'next/head'

export interface HeadProps {
	url: string
	title: string
	description: string
	storagePreconnect?: boolean
}

const Head = ({ url, title, description, storagePreconnect = true }: HeadProps) => (
	<NextHead>
		<link key="canonical" rel="canonical" href={url} />
		<meta key="description" name="description" content={description} />
		<meta key="og-url" property="og:url" content={url} />
		<meta key="og-title" property="og:title" content={title} />
		<meta key="og-description" property="og:description" content={description} />
		<meta key="twitter-title" name="twitter:title" content={title} />
		<meta key="twitter-description" name="twitter:description" content={description} />
		<title key="title">{title}</title>
		
		<link key="firestore-preconnect" rel="preconnect" href="https://firestore.googleapis.com" />
		{storagePreconnect && <link key="storage-preconnect" rel="preconnect" href="https://storage.googleapis.com" />}
	</NextHead>
)

export default Head
