import {readdir, stat } from "node:fs/promises";

export const navigationMethods = {
	async up() {
		const parentDir = this._resolvePath('..');
		if (this.cwd !== this._getRoot()) {
			this.cwd = parentDir;
		}
	},
	async cd(userPath) {
        if (!userPath) throw new Error('Invalid input');
        
        const targetPath = this._resolvePath(userPath);
        
        const stats = await stat(targetPath);
        if (!stats.isDirectory()) {
            throw new Error('Operation failed: Not a directory');
        }
        
        this.cwd = targetPath;
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