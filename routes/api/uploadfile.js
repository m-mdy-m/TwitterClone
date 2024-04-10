const { expose, route } = require("xprz").Route();
const multer = require("multer");
const path = require("path");
const User = require("../../model/User");
const {
  RegexValidator,
} = require("vfyjs/src/validator/requests/utils/AdditionalValidators");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/upload/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
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
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  dest: "/public/upload/",
});

route("/upload/profile/:userId")
  .mid([
    (ctx, nxt) => {
      upload.single("profile-image")(ctx.req, ctx.res, nxt);
    },
  ])
  .post(async (ctx) => {
    const { success, notFound, badRequest } = ctx.jsonSender();
    if (!ctx.file) {
      return badRequest("No file uploaded.");
    }
    const userId = ctx.param("userId");
    const modifiedPath  = path.normalize(ctx.file.path)  .replace(/^\\public\\/, '/')
    .replace(/\\/g, '/');
    // const modifiedPath = originalPath.replace(/\\public\\/, '/');
    console.log("modifiedPath:", modifiedPath);
    const user = await User.findByIdAndUpdate(userId, {
      profilePic: modifiedPath,
    });
    if (!user) {
      return notFound("User not found");
    }
    success("Profile picture uploaded successfully");
  });
module.exports = expose;
