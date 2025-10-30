import { createBrotliCompress, createBrotliDecompress } from "node:zlib"
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { perror } from "../../utils/formError.js";
import { stat } from "node:fs/promises"
import path from "node:path";

const GREEN = "\x1b[92m";
const DEFAULT = "\x1b[39m";

export const compressMethods = {
	async compress(pathToFile, pathToDestination) {
        try {
			if (!pathToFile || !pathToDestination) throw new Error('compress: Invalid input');
        	const sourcePath = this._resolvePath(pathToFile);
			const filename = path.basename(sourcePath) + ".br";
        	const destPath = pathToDestination === '.' 
			? path.join(this.cwd, filename) 
			: path.join(this._resolvePath(pathToDestination), filename);
			const stats = await stat(sourcePath);
            if (stats.isDirectory()) throw new Error('compress: Source is a directory');
            const source = createReadStream(sourcePath);
            const brotli = createBrotliCompress();
            const destination = createWriteStream(destPath);
            await pipeline(source, brotli, destination);
			console.log(`Compress file ${GREEN}${pathToFile}${DEFAULT} to ${GREEN}${path.join(pathToDestination, path.basename(destPath))}${DEFAULT}!`);
        } catch (error) {
            perror(error, 'compress');
        }
    },
	async decompress(pathToFile, pathToDestination) {
        try {
			if (!pathToFile || !pathToDestination) throw new Error('decompress: Invalid input');
        	const sourcePath = this._resolvePath(pathToFile);
			const filename = path.basename(sourcePath).replace(/\.br$/i, "");
        	const destPath = pathToDestination === '.' 
				? path.join(this.cwd, filename) 
				: path.join(this._resolvePath(pathToDestination), filename);
			const stats = await stat(sourcePath);
            if (stats.isDirectory()) throw new Error('decompress: Source is a directory');
            const source = createReadStream(sourcePath);
            const brotli = createBrotliDecompress();
            const destination = createWriteStream(destPath);
            await pipeline(source, brotli, destination);
			console.log(`Decompress file ${GREEN}${pathToFile}${DEFAULT} to ${GREEN}${path.join(pathToDestination , path.basename(destPath))}${DEFAULT}!`);
        } catch (error) {
            perror(error, 'decompress');
        }
    },
};