import readline from "node:readline";
import process from "node:process";
import FileManager from "./utils/FileManager.js";
import { EOL } from "node:os";

import { completer } from "./utils/completer.js";

const RED = "\x1b[91m";
const GREEN = "\x1b[92m";
const ORANGE = "\x1b[93m";
const BLUE = "\x1b[94m";
const PUR = "\x1b[95m";
const DEFAULT = "\x1b[39m";

const RED_BG = "\x1b[101m";
const GREEN_BG = "\x1b[102m";
const ORANGE_BG = "\x1b[103m";
const BLUE_BG = "\x1b[104m";
const PUR_BG = "\x1b[105m";
const DEFAULT_BG = "\x1b[49m";

const argvUsername = process.argv[2];
const username = argvUsername?.split("=")[1] || null;

if (username == null) {
	console.error(`${RED_BG}Incorrect Usage.${DEFAULT_BG}\n${PUR}Usage: npm run start -- --username=your_username${DEFAULT}`);
	process.exit(1);
}

const fm = new FileManager(username);



// function completer(line, callback) {
//     const parts = line.trim().split(' ');
//     const cmd = parts[0];
//     if (parts.length <= 1 && COMMANDS.indexOf(cmd) == -1) {
//         const hits = COMMANDS.filter((c) => c.startsWith(cmd));
//         callback(null, [hits, cmd]);
//         return;
//     }
//     const input = parts[1] || ''; 
//     if (['up', 'ls', '.exit', 'os'].includes(cmd)) {
//         callback(null, [[], line]);
//         return;
//     }
//     (async () => {
//         try {
//             const entries = await readdir(fm.cwd, { withFileTypes: true });
//             const hits = entries
//                 .map(entry => entry.name)
//                 .filter((name) => name.startsWith(input));
            
//             callback(null, [hits, input]);
//         } catch (e) {
//             callback(e, [[], line]); 
//         }
//     })();
// }

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "$> ",
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