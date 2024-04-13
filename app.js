const Xprz = require("xprz");
const Message = require("./model/Messages");
// Initialize Xprz package with dotenv setup
Xprz.Package().dotenv();
// Destructure required functions from Xprz App module
const { use, useCtx, launch, loadRoutes, bodyParsing, static } = Xprz.App()
const {  route } = Xprz.Route()

// Launch the application
const app = launch();
// Enable parsing of JSON bodies
bodyParsing();

// Serve static files from the 'public' directory
static("public");

const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  console.log("Socket details:", socket);

  socket.on("message", async (data) => {
    try {
      console.log("Received message from", socket.id, ":", data); // Log sender ID
      const newMessage = await Message.create({ content: data });
      io.emit("message", newMessage.content);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });
  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id); // Log disconnected ID
  });
});
// Import and use cookie-parser middleware
const cookieParser = require("cookie-parser");
use(cookieParser());

// Load setup middleware
$read("middleware/setup");

useCtx((ctx, nxt) => {
  if (ctx.code === "EBADCSRFTOKEN") {
    // CSRF token validation failed
    ctx
      .status(403)
      .json({ error: "CSRF token validation failed. Please try again." });
  } else {
    // Other errors
    nxt(ctx);
  }
});

useCtx((ctx, next) => {
  ctx.status(500).send("Something broke!");
});
// Connect to the database
$read("utils/database");

// Load route handlers
loadRoutes("routes");
io.attach(http)