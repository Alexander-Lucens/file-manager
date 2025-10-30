import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "url";

import { navigationMethods } from "../app/navigation/methods.js";
import { fsMethods } from "../app/file-system/methods.js";

class FileManager {
	username;
	input;
	cwd;

	constructor(username) {
		this.username = username;
		this.cwd = os.homedir();
		console.log(`Welcome to the File Manager, ${this.username}!`);
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
		console.log(`You are currently in ${this.cwd}`);
	}

	exit(exitStatus) {
		console.log(`\nThank you for using File Manager, ${this.username}, goodbye!\n`);
		process.exit(exitStatus || 0);
	}

}

Object.assign(FileManager.prototype, navigationMethods, fsMethods);

export default FileManager;