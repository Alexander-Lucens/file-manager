import {readdir, stat } from "node:fs/promises";
import { perror } from "../../utils/formError.js";

const GREEN = "\x1b[92m";
const DEFAULT = "\x1b[39m";
const CPATH = (path) => `${GREEN}${path}${DEFAULT}`;

export const navigationMethods = {
	async up() {
		const parentDir = this._resolvePath('..');
		if (this.cwd !== this._getRoot()) {
			this.cwd = parentDir;
		}
	},
	async cd(userPath) {
        try {
            if (!userPath) throw new Error('cd: Invalid input');
            const targetPath = this._resolvePath(userPath);
            const stats = await stat(targetPath);
            if (!stats.isDirectory()) {
                throw new Error(`cd: ${CPATH(targer)}: Is not a directory`);
            }
            this.cwd = targetPath;
        } catch (error) {
            perror(error, 'cd');
        }
        
    },
	async ls() {
        const entries = await readdir(this.cwd, { withFileTypes: true });
        const folders = [];
        const files = [];

        for (const entry of entries) {
            (entry.isDirectory() ? folders : files).push({
                Name: entry.name,
                Type: entry.isDirectory() ? 'directory' : 'file'
            });
        }
        folders.sort();
        files.sort();
        console.table([...folders, ...files]);
    },
};