class FileManager {
	_username;
	_exit;
	_input;

	constructor(username) {
		this._username = username;
		this._exit = 0;
		console.log(`Welcome to the File Manager, ${username}!`);
	}

	listen() {
		console.log(`\nType '.exit' or press 'Ctrl+C' to quit.\n`);
		process.stdin.setEncoding('utf-8');

		process.stdin.on('data', (input) => {
			if (input ===  '\u0003' || input.trim() === '.exit') {
				console.log(`\nThank you for using File Manager, ${this._username}, goodbye!\n`);
				process.exit(0);
			} else if (input == '\u0004') {

			} else {
				console.log(`You typed: ${input}`);
			}
		});

		process.stdin._write('');

		process.on('SIGTERM', () => console.log('Termination signal'));
		process.on('SIGHUP', () => console.log('Terminal closed'));
	}
	


}

export default FileManager;