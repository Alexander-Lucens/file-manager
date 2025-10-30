import { EOL, cpus, homedir, arch, userInfo } from "node:os";

const ORANGE_BG = "\x1b[103m";
const GREEN_BG = "\x1b[102m";
const DEFAULT_BG = "\x1b[49m";

function getEOL() {
	console.log(JSON.stringify(EOL));
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
	console.log(homedir());
}

function getUsername() {
	console.log(userInfo().username);
}

function getArchitecture() {
	console.log(arch());
}

const osHandlers = new Map([
	['--EOL', getEOL], 
	['--cpus', getCPU], 
	['--homedir', getHomedir], 
	['--username', getUsername], 
	['--architecture', getArchitecture ]
]);


export const osMethods = {
	async os(arg) {
		const handler = osHandlers.get(arg);

		if (!arg || !handler) {
			throw new Error('Invalid input');
		}
		
		handler();
	}
};