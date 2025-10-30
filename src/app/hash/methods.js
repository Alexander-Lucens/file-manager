import crypto from 'node:crypto';
import fs from 'node:fs';
import { stat } from "node:fs/promises";

const PUR = "\x1b[95m";
const DEFAULT = "\x1b[39m";

export const hashMethods = {
	async hash(file) {
		try {
			if (!file) throw new Error('hash: Invalid input');
			const filePath = this._resolvePath(file);
			const access = await stat(filePath);
			if (access.isDirectory()) {
				throw new Error(`hash: ${file} is directory`);
			}
			const hash = crypto.createHash("sha256");
			const stream = fs.createReadStream(filePath);

			await new Promise((resolve, reject) => {
				stream.pipe(hash)
				.on('finish', () => {
					console.log(`${PUR}${hash.digest('hex')}${DEFAULT}`);
					resolve();
				})
				.on('error', reject);

				stream.on('error', reject);
			});
		} catch (error) {
			const out = error.message.startsWith('rn:') ?
				`Operation failed\n${error.message}` :
				`Operation failed`;
			console.error(out);
		}
	},
};
