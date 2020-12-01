import firebase from 'firebase/app'

if (!firebase.apps.length)
	firebase.initializeApp({
		apiKey: 'AIzaSyB13_2StV6vQhUx4aPAcZI75ROMqV8sewM',
		authDomain: 'file-in.firebaseapp.com',
		databaseURL: 'https://file-in.firebaseio.com',
		projectId: 'file-in',
		storageBucket: 'u.filein.io',
		messagingSenderId: '305570645544',
		appId: '1:305570645544:web:a59880e8e964bef3a2171d',
		measurementId: 'G-ES7L5THM5X'
	})

export default firebase
