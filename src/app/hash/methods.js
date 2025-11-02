import crypto from 'node:crypto';
import fs from 'node:fs';
import { stat } from "node:fs/promises";
import { perror } from '../../utils/formError.js';

const GREEN = "\x1b[92m";
const PUR = "\x1b[95m";
const DEFAULT = "\x1b[39m";
const CPATH = (path) => `${GREEN}${path}${DEFAULT}`;
const PRT = (text) => `${PUR}${text}${DEFAULT}`;

export const hashMethods = {
	async hash(file) {
		try {
			if (!file) throw new Error('hash: Invalid input');
			const filePath = this._resolvePath(file);
			const access = await stat(filePath);
			if (access.isDirectory()) {
				throw new Error(`hash: ${CPATH(file)} is directory`);
			}
			const hash = crypto.createHash("sha256");
			const stream = fs.createReadStream(filePath);

			await new Promise((resolve, reject) => {
				stream.pipe(hash)
				.on('finish', () => {
					console.log(`${PRT(hash.digest('hex'))}`);
					resolve();
				})
				.on('error', reject);

				stream.on('error', reject);
			});
		} catch (error) {
			perror(error, "hash");
		}
	},
};
