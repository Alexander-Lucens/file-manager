import { EOL, cpus, homedir, arch, userInfo } from "node:os";

const ORANGE_BG = "\x1b[103m";
const GREEN_BG = "\x1b[102m";
const DEFAULT_BG = "\x1b[49m";

const GREEN = "\x1b[92m";
const BLUE = "\x1b[94m";
const PUR = "\x1b[95m";
const DEFAULT = "\x1b[39m";

const CPATH = (path) => `${GREEN}${path}${DEFAULT}`;
const CNAME = (name) => `${BLUE}${name}${DEFAULT}`;
const ARCH = (text) => `${PUR}${text}${DEFAULT}`;

function getEOL() {
	console.log(`EOL: ${ARCH(JSON.stringify(EOL))}`);
}

function getCPU() {
	const cpuData = cpus();
	console.log(`${GREEN_BG} Total CPUs:${ORANGE_BG} ${cpuData.length} ${DEFAULT_BG}`);
	console.table(cpuData.map(cpu => ({
		model: cpu.model,
		clock_rate: `${(cpu.speed / 1000).toFixed(2)} GHz`
	})));
}

function getHomedir() {
	console.log(`Home dirrectory: ${CPATH(homedir())}`);
}

function getUsername() {
	console.log(`Username: ${CNAME(userInfo().username)}`);
}

function getArchitecture() {
	console.log(`Architecture: ${ARCH(arch())}`);
}

const osHandlers = new Map([
	['--EOL', getEOL], 
	['--cpus', getCPU], 
	['--homedir', getHomedir], 
	['--username', getUsername], 
	['--architecture', getArchitecture ]
]);

/**
 * Here just check in map is second argument in os is one from 
 * list and execute it if all fine otherwise throw and Invalid input Error
 */
export const osMethods = {
	async os(arg) {
		const handler = osHandlers.get(arg);
		if (!arg || !handler) {
			throw new Error('Invalid input');
		}
		handler();
	}
};