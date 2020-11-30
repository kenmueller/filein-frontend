const clipBody = (clipped: boolean) =>
	document.body.classList[clipped ? 'add' : 'remove']('clipped')

export default clipBody
