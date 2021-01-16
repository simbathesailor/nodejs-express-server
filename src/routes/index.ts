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

  const fileSize = stat.size
  const range = req.headers.range
  console.log("🚀 ~ file: index.ts ~ line 20 ~ router.get ~ range", range)



  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path1, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path1).pipe(res)
  }
  
})

export default router
