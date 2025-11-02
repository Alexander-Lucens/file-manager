import readline from "node:readline";
import process from "node:process";
import FileManager from "./utils/FileManager.js";
import { readdir } from "node:fs/promises";

const ORANGE = "\x1b[93m";
const DEFAULT = "\x1b[39m";

import { getUsername } from "./app/cli/methods.js";

const username = getUsername();

const fm = new FileManager(username);

const COMMANDS = [
    '.exit', 'up', 'cd', 'ls', 'cat', 'add', 'mkdir', 'rn', 'cp', 'mv', 'rm',
    'rmdir', 'os', 'hash', 'compress', 'decompress'
];

const OSMETHODS = [ '--EOL', 
					'--cpus', 
					'--homedir', 
					'--username', 
					'--architecture'];

function completer(line, callback) {
    const parts = line.trim().split(' ');
    const cmd = parts[0];
    if (parts.length <= 1 && !COMMANDS.includes(cmd)) {
        const hits = COMMANDS.filter((c) => c.startsWith(cmd));
        callback(null, [hits, cmd]);
        return;
    }
    const input = parts[1] || ''; 
    if (['up', 'ls', '.exit'].includes(cmd)) {
        callback(null, [[], line]);
        return;
    }
	if (cmd === 'os') {
		const hits = OSMETHODS.filter((c) => c.startsWith(input))
		callback(null, [hits, input]);
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
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: `${ORANGE}$> ${DEFAULT}`,
	completer: completer
});

rl.on('line', async (line) => {
	const input = line.trim();
	if (!input) {
		fm.printCWD();
		rl.prompt();
		return ;
	}

	const [cmd, ...args] = input.split(' ');

	if (cmd === '.exit') {
		rl.close();
		return;
	}
	
	if (typeof fm[cmd] === 'function') {
		try {
			await fm[cmd](...args);
		} catch (error) {
			console.error(error);
			// error.message.includes('Invalid input') ? console.error('Invalid input') : console.error('Operation failed');
		}
	} else {
		console.error('Invalid input');
	}

	fm.printCWD();
	rl.prompt();
});

rl.on('close', () => {
	fm.exit();
});

rl.on('SIGINT', () => {
	rl.close();
});

fm.printCWD();
rl.prompt();