import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify'
import { config } from '@fortawesome/fontawesome-svg-core'

import UploadDrop from 'components/UploadDrop'
import UploadFile from 'components/UploadFile'
import CurrentFile from 'components/CurrentFile'
import Navbar from 'components/Navbar'

import { src as appleTouchIcon } from 'images/apple-touch-icon.png'
import { src as icon32 } from 'images/icon-32x32.png'
import { src as icon16 } from 'images/icon-16x16.png'

import 'styles/global.scss'

config.autoAddCss = false

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
	<>
		<Head>
			<link key="fonts-googleapis-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />
			<link key="fonts-gstatic-preconnect" rel="preconnect" href="https://fonts.gstatic.com" />
			<link
				key="roboto-stylesheet"
				rel="stylesheet"
				href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
			/>
			<meta key="og-site-name" property="og:site_name" content="filein" />
			<meta key="og-type" property="og:type" content="website" />
			<meta key="twitter-card" name="twitter:card" content="summary_large_image" />
			<meta key="twitter-site" name="twitter:site" content="@filein" />
			<meta key="twitter-creator" name="twitter:creator" content="@filein" />
			<meta key="twitter-domain" name="twitter:domain" content="filein.io" />
			<link key="apple-touch-icon" rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
			<link key="icon-32x32" rel="icon" type="image/png" sizes="32x32" href={icon32} />
			<link key="icon-16x16" rel="icon" type="image/png" sizes="16x16" href={icon16} />
			<link key="manifest" rel="manifest" href="/site.webmanifest" />
			<meta key="msapplication-tilecolor" name="msapplication-TileColor" content="#ffffff" />
			<meta key="theme-color" name="theme-color" content="#ffffff" />
			<meta key="slack-app-id" name="slack-app-id" content={process.env.NEXT_PUBLIC_SLACK_APP_ID} />
		</Head>
		<RecoilRoot>
			<UploadDrop>
				<UploadFile />
				<CurrentFile />
				<Navbar />
				<Component {...pageProps} />
				<ToastContainer />
			</UploadDrop>
		</RecoilRoot>
	</>
)

export default App
