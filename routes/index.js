const express = require("express");
const router = express.Router();

/* GET home page. */
router.get(
	"/",
	(req, res) => {
		res.render("index", { title: "Troubleshooter Save File Editor" });
	}
);

router.use((request, response, next) => {
	//console.log("request", request);
	//console.log("response", response);
	next();
});

module.exports = router;
