import { stat, writeFile, mkdir, rm, rmdir, rename,  } from "node:fs/promises";
import fs, { createReadStream, createWriteStream } from "node:fs";
import process from "node:process";
import { pipeline } from "node:stream/promises";
import { perror } from "../../utils/formError.js";
import path from "node:path";


const GREEN = "\x1b[92m";
const ORANGE = "\x1b[93m";
const BLUE = "\x1b[94m";
const PUR = "\x1b[95m";
const DEFAULT = "\x1b[39m";

export const fsMethods = {
	async cat(targer) {
		try {
			if (!targer) throw new Error('cat: Invalid input');
			const targetPath = this._resolvePath(targer);
			const access = await stat(targetPath);
			if (access.isDirectory()) throw new Error(`cat: ${GREEN}${targer}${DEFAULT}: Is a directory`);
			const read = fs.createReadStream(targetPath, { encoding: 'utf-8'});
			await pipeline(read, process.stdout, { end: false });
		} catch(error) {
			perror(error, 'cat');
		}
	},
	async add(target) {
		try {
			if (!target) throw new Error('add: Invalid input');
			const targetPath = this._resolvePath(target);
			await writeFile(targetPath, '', { flag: "wx" });
			console.log(`File ${GREEN}${target}${DEFAULT} created!`);
		} catch(error) {
			perror(error, 'add');
		}
	},
	async mkdir(target) {
		try {
			if (!target) throw new Error('mkdir: Invalid input');
			const targetPath = this._resolvePath(target);
			await mkdir(targetPath, { flag: "wx" });
			console.log(`Directory ${GREEN}${target}${DEFAULT} created!`);
		} catch(error) {
			perror(error, 'mkdir');
		}
	},
	async rm(target) {
		try {
			if (!target) throw new Error('rm: Invalid input');
			const targetPath = this._resolvePath(target);
			const access = await stat(targetPath);
			if (access.isDirectory()) throw new Error(`rm: ${GREEN}${target}${DEFAULT}: Is a directory`);
			await rm(targetPath, { force: true });
			console.log(`File ${GREEN}${target}${DEFAULT} deleted!`);
		} catch(error) {
			perror(error, 'rm');
		}
	},
	async rmdir(target) {
		try {
			if (!target) throw new Error('rmdir: Invalid input');
			const targetPath = this._resolvePath(target);
			const access = await stat(targetPath);
			if (!access.isDirectory()) throw new Error(`rmdir: ${GREEN}${target}${DEFAULT}: Is not a directory`);
			await rmdir(targetPath, { recursive: true, force: true });
			console.log(`Directory ${GREEN}${target}${DEFAULT} deleted!`);
		} catch(error) {
			perror(error, 'rmdir');
		}
	},
	async rn(target, newName) {
		try {
			if (!target || !newName) throw new Error('rn: Invalid input');
			const targetPath = this._resolvePath(target);
			const access = await stat(targetPath);
			if (access.isDirectory()) throw new Error(`rn: ${GREEN}${target}${DEFAULT}: Is a directory`);
			const newTargetPath = this._resolvePath(newName);
			await rename(targetPath, newTargetPath);
			console.log(`File name ${GREEN}${target}${DEFAULT} changed!`);
		} catch(error) {
			perror(error, 'rn');
		}
	},
	async cp(source, target) {
		try {
			if (!source || !target) throw new Error('cp: Invalid input');
			const targetPath = this._resolvePath(target);
			const sourcePath = this._resolvePath(source);
			const [sourceStat, targetStats] = await Promise.all([
				stat(sourcePath),
				stat(targetPath)
			]);
			if (sourceStat.isDirectory()) {
				throw new Error(`cp: Source is a directory`);
			}
			if (!targetStats.isDirectory()) {
				throw new Error(`cp: Target is not a directory`);
			}
			const filename = path.basename(sourcePath);
			const destPath = path.join(targetPath, filename);
			const readStream = createReadStream(sourcePath);
			const writeStream = createWriteStream(destPath);
			await pipeline(readStream, writeStream);
			console.log(`Created copy of ${GREEN}${source}${DEFAULT} in ${GREEN}${target}${DEFAULT}!`);
		} catch(error) {
			perror(error, 'cp');
		}
	},
	async mv(source, target) {
		try {
			if (!source || !target) throw new Error('mv: Invalid input');
			const targetPath = this._resolvePath(target);
			const sourcePath = this._resolvePath(source);
			const [sourceStat, targetStats] = await Promise.all([
				stat(sourcePath),
				stat(targetPath)
			]);
			if (sourceStat.isDirectory()) {
				throw new Error(`mv: Source is a directory`);
			}
			if (!targetStats.isDirectory()) {
				throw new Error(`mv: Target is not a directory`);
			}
			const filename = path.basename(sourcePath);
			const destPath = path.join(targetPath, filename);
			const readStream = createReadStream(sourcePath);
			const writeStream = createWriteStream(destPath);
			await pipeline(readStream, writeStream);
			await rm(sourcePath, { force: true });
			console.log(`Moved ${GREEN}${source}${DEFAULT} in ${GREEN}${target}${DEFAULT}!`);
		} catch(error) {
			perror(error, 'mv');
		}
	},
}; 