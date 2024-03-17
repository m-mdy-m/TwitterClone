const Xprz = require("xprz");
const {Package } = new Xprz();
const { session, connectMongoDbSession, csrf } = new Package();

// Connect to MongoDB session store using the provided URI and specify the collection name
const store = connectMongoDbSession({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

// Define options for session middleware, including session secret and store
const options = {
  secret: "ha ha ha", // Replace with a secure secret
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
  },
};

// Initialize session middleware with the specified options
session(options);
// Initialize CSRF protection middleware with cookie option and provide CSRF token endpoint
csrf({ cookie: true }).provideCsrfToken();
