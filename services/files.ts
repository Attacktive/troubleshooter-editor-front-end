import { Request, Response, Router } from "express";
import multer from "multer";
import selectAll from "./dao";

const router = Router();
const upload = multer({ dest: "uploaded" });

router.get(
	"/",
	(req: Request, res: Response) => {
		res.send("respond with a resource");
	}
).post(
	"/upload",
	upload.single("file"),
	(req: Request, res: Response) => {
		const file = req.file;
		const path = file!.path;

		selectAll(path)
			.then(result => {
				res.status(200).send(result);
			}).catch(error => {
				console.error("error", error);
				res.status(500).send(error);
			});
	}
);

export = router;
