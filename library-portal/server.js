const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: "library_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // session valid for 1 minute
}));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Import routes
const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Library Portal running at http://localhost:${PORT}`);
});
