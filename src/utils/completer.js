import { readdir } from "node:fs/promises";

const COMMANDS = [
    '.exit', 'up', 'cd', 'ls', 'cat', 'add', 'mkdir', 'rn', 'cp', 'mv', 'rm',
    'os', 'hash', 'compress', 'decompress'
];

export function completer(line, callback) {
	const parts = line.trim().split(' ');
	const cmd = parts[0];
	if (parts.length <= 1 && COMMANDS.indexOf(cmd) == -1) {
		const hits = COMMANDS.filter((c) => c.startsWith(cmd));
		callback(null, [hits, cmd]);
		return;
	}
	const input = parts[1] || ''; 
	if (['up', 'ls', '.exit', 'os'].includes(cmd)) {
		callback(null, [[], line]);
		return;
	}
	(async () => {
		try {
			const entries = await readdir(fm.cwd, { withFileTypes: true });
			const hits = entries
				.map(entry => entry.name)
				.filter((name) => name.startsWith(input));
			
			callback(null, [hits, input]);
		} catch (e) {
			callback(e, [[], line]); 
		}
	})();
};