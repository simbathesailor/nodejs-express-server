import express from "express"
import fs from "fs"
import path from "path"
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/video", function(req, res, next) {
  const path1 = path.resolve(`src/video.mp4`)
  console.log("🚀 ~ file: index.ts ~ line 13 ~ router.get ~ path1", path1)
  console.log("__dirname__  ======>", __dirname)
  const stat = fs.statSync(path1)
  console.log("🚀 ~ file: index.ts ~ line 13 ~ router.get ~ stat", stat)
  res.send("Got the video , check the console")
})

export default router
