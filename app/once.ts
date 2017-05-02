export default function(fn: Function, ...args: any[]) {
	let returnValue: any
    let called = false
	return () => {
		if (!called) {
			called = true
			returnValue = fn.apply(null, args)
		}
		return returnValue
	}
}
