const express = require("express");
const router = express.Router();

/* GET home page. */
router.get(
	"/",
	(req, res) => {
		res.render("index", { title: "Troubleshooter Save File Editor" });
	}
);

router.use((error, request, response, next) => {
	if (error) {
		console.log("request", request);
		console.error(error);
	}

	next();
});

module.exports = router;
