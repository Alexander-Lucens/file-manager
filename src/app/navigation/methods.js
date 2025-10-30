import {readdir, stat } from "node:fs/promises";
import { perror } from "../../utils/formError.js";

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
                throw new Error(`cd: ${GREEN}${targer}${DEFAULT}: Is not a directory`);
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