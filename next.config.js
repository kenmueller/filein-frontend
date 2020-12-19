const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const ORIGIN = IS_PRODUCTION ? 'https://filein.io' : 'http://localhost:3000'

module.exports = require('next-optimized-images')({
	headers: () => [
		{
			source: '/(.*)',
			headers: [
				{ key: 'Access-Control-Allow-Origin', value: ORIGIN },
				{ key: 'Content-Security-Policy', value: [
					"default-src 'self'",
					"base-uri 'self'",
					"font-src 'self' https://fonts.gstatic.com",
					"frame-ancestors 'self'",
					"img-src 'self' data: https://storage.googleapis.com",
					"media-src 'self' data: https://storage.googleapis.com",
					`script-src 'self'${IS_PRODUCTION ? '' : " 'unsafe-eval'"}`,
					"script-src-attr 'none'",
					"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
					"connect-src 'self' https://*.googleapis.com https://vitals.vercel-insights.com",
					'block-all-mixed-content',
					'upgrade-insecure-requests'
				].join(';') },
				{ key: 'Expect-CT', value: '0' },
				{ key: 'Referrer-Policy', value: 'no-referrer' },
				{ key: 'Strict-Transport-Security', value: 'max-age=15552000; includeSubDomains' },
				{ key: 'X-Content-Type-Options', value: 'nosniff' },
				{ key: 'X-DNS-Prefetch-Control', value: 'off' },
				{ key: 'X-Download-Options', value: 'noopen' },
				{ key: 'X-Frame-Options', value: 'SAMEORIGIN' },
				{ key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
				{ key: 'X-XSS-Protection', value: '0' }
			]
		}
	]
})
