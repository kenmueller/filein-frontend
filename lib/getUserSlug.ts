import { nanoid } from 'nanoid'

import firebase from './firebase'
import toSlug from './toSlug'

import 'firebase/firestore'

const firestore = firebase.firestore()

const getUserSlug = async (name: string) => {
	const slug = toSlug(name)
	const { empty } = await firestore
		.collection('users')
		.where('slug', '==', slug)
		.limit(1)
		.get()
	
	return empty
		? slug
		: `${slug}-${nanoid(5)}`
}

export default getUserSlug
