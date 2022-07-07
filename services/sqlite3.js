const sqlite3 = require("sqlite3").verbose();

function openFile(pathToFile) {
	const db = new sqlite3.Database(
		pathToFile,
		error => {
			if (error) {
				console.error(error);
			}

			console.log("Connected");
		}
	)
}

module.exports = openFile;
