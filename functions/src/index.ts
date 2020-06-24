import { initializeApp } from 'firebase-admin'

initializeApp({
	storageBucket: 'file-in.appspot.com'
})

export { default as app } from './app'
