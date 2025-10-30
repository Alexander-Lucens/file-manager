import process from "node:process";

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


export function getUsername() {
	const argvUsername = process.argv[2];
	const username = argvUsername?.split("=")[1] || null;

	if (username == null) {
		console.error(`${RED_BG}Incorrect Usage.${DEFAULT_BG}\n${PUR}Usage: npm run start -- --username=your_username${DEFAULT}`);
		process.exit(1);
	}

	return username;
};
