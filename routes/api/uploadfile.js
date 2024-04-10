const { expose, route } = require("xprz").Route();
const multer = require("multer");
const User = require("../../model/User");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/upload/");
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()
    const day = date.getDate();

    const formatDate = `${year}-${month}-${day}`;
    const formatFil = `${formatDate}-${file.originalname}`;
    cb(null, formatFil);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter }).single("profilePic");

route("/upload/profile/:userId")
  .mid([
    (ctx, nxt) => {
        upload(ctx.req, ctx.res, (err) => {
          if (err) {
            console.error("Upload error:", err);
            return ctx.jsonSender().badRequest("Error uploading file: " + err.message);
          }
          nxt();
        });
      },
  ])
  .post(async (ctx) => {
    const { success, notFound, badRequest } = ctx.jsonSender();
    if (!ctx.file) {
      return badRequest("No file uploaded.");
    }
    const userId = ctx.param("userId");
    const user = await User.findByIdAndUpdate(userId, {
      profilePic: ctx.file.path,
    });
    if (!user) {
      return notFound("User not found");
    }
    success("Profile picture uploaded successfully");
  });
module.exports = expose;
