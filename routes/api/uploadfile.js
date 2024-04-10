const { expose, route } = require("xprz").Route();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage: storage });

route("/upload/profile").mid([
    (ctx,nxt)=>{
        upload.single('profilePic')(ctx.req,ctx.res,nxt)
    }
]).post(ctx=>{
    if (!ctx.file) {
        return ctx.status(400).send('No file uploaded.');
      }
      ctx.send('File uploaded successfully.');
});
module.exports = expose;
