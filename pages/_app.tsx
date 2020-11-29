import { MouseEvent, useCallback } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useDropzone } from 'react-dropzone'
import { ToastContainer } from 'react-toastify'
import { config } from '@fortawesome/fontawesome-svg-core'

import Navbar from 'components/Navbar'

import 'styles/global.scss'

config.autoAddCss = false

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	const onDrop = useCallback((files: File[]) => {
		
	}, [])
	
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		noClick: true,
		multiple: false
	})
	
	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			<Head>
				<link key="fonts-googleapis-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />
				<link key="fonts-gstatic-preconnect" rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					key="roboto-stylesheet"
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
				/>
			</Head>
			<Navbar />
			<Component {...pageProps} />
			<ToastContainer />
		</div>
	)
}

export default App
