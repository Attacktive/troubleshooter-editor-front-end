import * as sqlite3 from "sqlite3";
import { Database } from "sqlite3";

const sqlite = sqlite3.verbose();

let db: Database;

function selectAll(pathToFile: string): Promise<Record<string, unknown>> {
	db = new sqlite.Database(
		pathToFile,
		error => {
			if (error) {
				console.error(error);
			}

			console.debug("Connected");
		}
	);

	return new Promise<Record<string, unknown>>((resolve, reject) => {
		db.all(
			"select companyID, CompanyName from company",
			undefined,
			(error: Error, rows: Record<string, unknown>[]) => {
				if (error) {
					reject(undefined);
				} else {
					// TODO
					const object = {
						companyId: rows[0]["companyID"],
						companyName: rows[0]["CompanyName"]
					};

					resolve(object);
				}
			}
		);
	});
}

export = selectAll;
