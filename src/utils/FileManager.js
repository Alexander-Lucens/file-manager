import os from "node:os";
import path from "node:path";

const GREEN = "\x1b[92m";
const ORANGE = "\x1b[93m";
const BLUE = "\x1b[94m";
const PUR = "\x1b[95m";
const DEFAULT = "\x1b[39m";

import { navigationMethods } from "../app/navigation/methods.js";
import { fsMethods } from "../app/file-system/methods.js";
import { osMethods } from "../app/os-info/methods.js";
import { hashMethods } from "../app/hash/methods.js";

class FileManager {
	username;
	input;
	cwd;

	constructor(username) {
		this.username = username;
		this.cwd = os.homedir();
		console.log(`Welcome to the File Manager, ${BLUE}${this.username}${DEFAULT}!`);
	}

	_resolvePath(userPath) {
		return path.resolve(this.cwd, userPath);
	}

	_getCWD() {
		return path.parse(this.cwd);
	}

	_getRoot() {
		return path.parse(this.cwd).root;
	}

	printCWD() {
		console.log(`You are currently in ${GREEN}${this.cwd}${DEFAULT}`);
	}

	exit(exitStatus) {
		console.log(`\nThank you for using File Manager, ${BLUE}${this.username}${DEFAULT}, goodbye!`);
		process.exit(exitStatus || 0);
	}

}

Object.assign(FileManager.prototype, 
	navigationMethods, 
	fsMethods,
	osMethods,
	hashMethods
);

export default FileManager;