const { expose, route } = require("xprz").Route();
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const User = require("../../model/User");
const TweetUserManager = require("../../utils/helper");
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const uploadPath = path.join(process.cwd(), "public", "upload");
    try {
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, "/public/upload");
    } catch (err) {
      console.error("Error creating upload directory:", err);
      return cb(err);
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "profile-" +
        req.params.userId +
        "-" +
        Date.now() +
        path.extname(file.originalname)
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
  limits: {
    fileSize: 400 * 1024, // 400 KB file size limit
  },
});

route("/upload/profile/:userId")
  .mid([
    (ctx, nxt) => {
      upload.single("profile-image")(ctx.req, ctx.res, (err) => {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return ctx.jsonSender().badRequest(`File size exceeds the limit. Maximum allowed file size is 400 KB.`);
          }
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
    const modifiedPath = ctx.file.path
      .replace(/^\\public\\/, "/")
      .replace(/\\/g, "/");
    const user = await User.findById(userId);
    if (!user) {
      return notFound("User not found");
    }
    user.profilePic = modifiedPath;
    await user.save();
    const tweetManager = new TweetUserManager(ctx, ctx.jsonSender);
    const tokens = await tweetManager.saveUser(user);
    success("Profile picture uploaded successfully", { tokens: tokens });
  });
module.exports = expose;
