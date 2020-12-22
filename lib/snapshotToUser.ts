import User from 'models/User'
import firebase from './firebase'

const snapshotToUser = (
	snapshot: firebase.firestore.DocumentSnapshot | FirebaseFirestore.DocumentSnapshot,
	includeApiKey: boolean = false
) => {
	if (!snapshot.exists)
		return null
	
	const user: User = {
		id: snapshot.id,
		slug: snapshot.get('slug'),
		name: snapshot.get('name'),
		files: snapshot.get('files'),
		comments: snapshot.get('comments')
	}
	
	if (includeApiKey)
		user.apiKey = snapshot.get('apiKey')
	
	return user
}

export default snapshotToUser
