const Xprz = require("xprz");
const { session, connectMongoDbSession, csrf } = Xprz.Package();

// Connect to MongoDB session store using the provided URI and specify the collection name
const store = connectMongoDbSession({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

// Define options for session middleware, including session secret and store
const options = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  },
};

// Initialize session middleware with the specified options
session(options);
// Initialize CSRF protection middleware with cookie option and provide CSRF token endpoint
csrf({ cookie: true }).provideCsrfToken();
