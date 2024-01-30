const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path'); // Add this line for the 'path' module

// Serve static files from the "public" directory, and set the view engine to "ejs"
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Route Handling and Configuration
app.get("/", async function(req, res) {
    try {
        const response = await axios.get("https://api.adviceslip.com/advice");
        const data = response.data; // Use response.data to access the JSON data
        var number = data['slip'].id;
        var text = data['slip'].advice;
        res.render("index.ejs", { adviceId: number, adviceText: text });
    } catch (error) {
        console.error(`Error message: ${error.message}`);
        res.status(500).send("Failed to fetch data.");
    }
});

// After app.use(express.static('public'));
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
