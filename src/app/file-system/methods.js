import { stat, writeFile } from "node:fs/promises";
import fs from "node:fs";
import process from "node:process";
import path from "node:path";
import { pipeline } from "node:stream/promises";

export const fsMethods = {

	async cat(filePath) {
		if (!filePath) throw new Error('Invalid input');
		const targetPath = this._resolvePath(filePath);
		try {
			const access = await stat(targetPath);
			if (access.isDirectory()) throw new Error(`cat: ${filePath}: Is a directory`);
			
			const read = fs.createReadStream(targetPath, { encoding: 'utf-8'});
			await pipeline(read, process.stdout, { end: false });
		} catch(error) {
			throw new Error(error.message.startsWith("cat:") ? error : "Operational error");
		}
	},
	async add(newFileName) {
		if (!newFileName) throw new Error('Invalid input');
		const targetPath = path._resolvePath(newFileName);
		try {
			await writeFile(targetPath, '', { flag: "wx" });
			console.log(`File ${newFileName} created successfuly!`);
		} catch(error) {
			throw new Error("Operational error");
		}
	},
}; 