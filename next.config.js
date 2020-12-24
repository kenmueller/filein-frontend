const { getCSP, SELF, DATA, INLINE, NONE } = require('csp-header')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const ORIGIN = IS_PRODUCTION ? 'https://filein.io' : 'http://localhost:3000'

module.exports = require('next-optimized-images')({
	headers: () => [
		{
			source: '/(.*)',
			headers: [
				{ key: 'Access-Control-Allow-Origin', value: ORIGIN },
				{
					key: 'Content-Security-Policy',
					value: getCSP({
						directives: {
							'default-src': [SELF],
							'base-uri': [SELF],
							'font-src': [
								SELF,
								'https://fonts.gstatic.com'
							],
							'frame-src': [
								SELF,
								'https://file-in.firebaseapp.com',
								'https://app.hubspot.com'
							],
							'frame-ancestors': [SELF],
							'img-src': [
								SELF,
								DATA,
								'https://storage.googleapis.com',
								'https://platform.slack-edge.com',
								'https://forms.hsforms.com',
								'https://track.hubspot.com'
							],
							'media-src': [
								SELF,
								DATA,
								'https://storage.googleapis.com'
							],
							'script-src': [
								SELF,
								...IS_PRODUCTION ? [] : ["'unsafe-eval'"],
								'https://apis.google.com',
								'https://js.hs-scripts.com',
								'https://js.hs-analytics.net',
								'https://js.hs-banner.com',
								'https://js.usemessages.com',
								'https://js.hscollectedforms.net'
							],
							'script-src-attr': [NONE],
							'style-src': [
								SELF,
								INLINE,
								'https://fonts.googleapis.com'
							],
							'connect-src': [
								SELF,
								'https://*.googleapis.com',
								'https://vitals.vercel-insights.com',
								'https://api.hubspot.com',
								'https://forms.hubspot.com'
							],
							'block-all-mixed-content': true,
							'upgrade-insecure-requests': true
						}
					})
				},
				{ key: 'Expect-CT', value: '0' },
				{ key: 'Referrer-Policy', value: 'no-referrer' },
				{ key: 'Strict-Transport-Security', value: 'max-age=15552000' },
				{ key: 'X-Content-Type-Options', value: 'nosniff' },
				{ key: 'X-DNS-Prefetch-Control', value: 'off' },
				{ key: 'X-Download-Options', value: 'noopen' },
				{ key: 'X-Frame-Options', value: 'SAMEORIGIN' },
				{ key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
				{ key: 'X-XSS-Protection', value: '0' }
			]
		}
	],
	redirects: () => [
		{
			source: '/slack/install',
			destination: process.env.NEXT_PUBLIC_SLACK_INSTALL_URL,
			statusCode: 302
		}
	]
})
