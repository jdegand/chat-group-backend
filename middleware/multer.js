const multer = require('multer')

/* multer callbacks not really working
    outdated?

    filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }

*/

const maxSize = 1 * 1024 * 1024;

const DIR = './public/uploads';
const storage = multer.diskStorage({
  destination: DIR,
   filename: (req, file, callback) => {
      callback(null, file.originalname); 
    }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize }
})

module.exports.send = (req, res, next) => {
  return upload.single('file')(req, res, () => {
    // Remember, the middleware will call it's next function
    // so we can inject our controller manually as the next()

    // add filesize limits here?

    // send file size limit error back?

    if (!req.file) return res.json({ error: 'No file' })
    next()
  })
}