import { atom } from 'recoil'

import Comment from 'models/Comment'

const commentsState = atom<Record<string, Comment[]>>({
	key: 'comments',
	default: {}
})

export default commentsState
