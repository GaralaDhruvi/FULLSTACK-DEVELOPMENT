const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Path to the backend JSON file
const dataFilePath = path.join(__dirname, "../usersData.json");

// Helper function to append login/logout to file
function logToFile(entry) {
    let data = [];
    if (fs.existsSync(dataFilePath)) {
        data = JSON.parse(fs.readFileSync(dataFilePath));
    }
    data.push(entry);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Home page (login form)
router.get("/", (req, res) => {
    res.render("home"); // Make sure home.ejs exists
});

// Login route
router.post("/login", (req, res) => {
    const { username } = req.body;

    if (username && username.trim() !== "") {
        const loginTime = new Date().toLocaleString();

        // Store session info
        req.session.user = {
            name: username.trim(),
            loginTime
        };

        // Log to terminal
        console.log(`✅ LOGIN: ${username.trim()} at ${loginTime}`);

        // Log to backend file
        logToFile({ name: username.trim(), loginTime, logoutTime: null });

        res.redirect("/profile");
    } else {
        res.render("error", { message: "⚠️ Username is required!" });
    }
});

// Profile route
router.get("/profile", (req, res) => {
    if (req.session.user) {
        res.render("profile", { user: req.session.user });
    } else {
        res.redirect("/");
    }
});

// Logout route
router.get("/logout", (req, res) => {
    if (req.session.user) {
        const logoutTime = new Date().toLocaleString();

        // Log to terminal
        console.log(`❌ LOGOUT: ${req.session.user.name} at ${logoutTime}`);

        // Update backend file: find last login without logout
        if (fs.existsSync(dataFilePath)) {
            const data = JSON.parse(fs.readFileSync(dataFilePath));
            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].name === req.session.user.name && !data[i].logoutTime) {
                    data[i].logoutTime = logoutTime;
                    break;
                }
            }
            fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        }
    }

    req.session.destroy(err => {
        if (err) {
            return res.render("error", { message: "❌ Error logging out!" });
        }
        res.redirect("/");
    });
});

module.exports = router;
