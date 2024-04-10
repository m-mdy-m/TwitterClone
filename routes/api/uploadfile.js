const { expose, route } = require("xprz").Route();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Upload files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append a unique suffix to the file name
  },
});
const upload = multer({ storage: storage });

route("/upload/profile").mid([upload.single('profilePic')]).post(ctx=>{
    if (!ctx.file) {
        return ctx.status(400).send('No file uploaded.');
      }
      ctx.send('File uploaded successfully.');
});
module.exports = expose;
