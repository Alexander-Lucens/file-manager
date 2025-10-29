import { fileURLToPath } from "url";
import path from "node:path";
import process, { argv } from "node:process";
import FileManager from "./utils/FileManager.js";

const main = () => {
	const argvUsername = process.argv[2];
	const username = argvUsername?.split("=")[1] || 
		process.env.USER || 
		process.env.USERNAME || 
		null;

	if (username == null) {
		console.error("Incorrect Usage.\nProgramm call: npm run start -- --username=your_username\nOr at least tou should have username in system.");
		process.exit(1);
	}
	
	const session = new FileManager(username);

	session.listen();
};

main();