const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploaded" });
const openFile = require("../services/sqlite3");

router.get(
	"/",
	(req, res) => {
		res.send("respond with a resource");
	}
).post(
	"/upload",
	upload.single("file"),
	(req, res) => {
		const file = req.file;
		const path = file.path;
		openFile(path);

		console.log("file", file);
		res.status(200)
		res.send("good");
	}
);

module.exports = router;
