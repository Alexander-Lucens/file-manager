const GREEN = "\x1b[92m";
const ORANGE = "\x1b[93m";
const BLUE = "\x1b[94m";
const PUR = "\x1b[95m";
const DEFAULT = "\x1b[39m";

export function perror(error, cmd) {
	const out = error.message.startsWith(`${cmd}:`) ?
		`Operation failed\n${error.message}` :
		`Operation failed`;
	console.error(out);
}