import process from "node:process";

const PUR = "\x1b[95m";
const DEFAULT = "\x1b[39m";

const RED_BG = "\x1b[101m";
const DEFAULT_BG = "\x1b[49m";

const CERR = (err) => `${PUR}${err}${DEFAULT}`;

export function getUsername() {
	const argvUsername = process.argv[2];
	const username = argvUsername?.split("=")[1] || null;
	const errmsg = "Usage: npm run start -- --username=your_username";
	if (username == null) {
		console.error(`${RED_BG}Incorrect Usage.${DEFAULT_BG}\n${CERR(errmsg)}`);
		process.exit(1);
	}

	return username;
};
