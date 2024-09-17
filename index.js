const bwipjs = require('bwip-js');
const { configDotenv } = require('dotenv');
const express = require('express');
const path = require('path'); // For resolving paths


const app = express();
const port = process.env.PORT || 8006;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Barcode generation route
app.get('/barcode/:url', (req, res) => {
    const bar = req.params.url;
    console.log("Received data:", bar);

    bwipjs.toBuffer({
        bcid: 'code128',  // Barcode type
        text: bar,        // Text to encode
        scale: 3,         // 3x scaling factor
        height: 10,       // Bar height, in millimeters
        includetext: true,  // Show human-readable text
        textxalign: 'center'  // Text alignment
    }, (err, png) => {
        if (err) {
            console.error("Error generating barcode:", err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.type('png');
            res.send(png); // Send the barcode image as a response
        }
    });
});

app.listen(port, () => {
    console.log(`Server connected at http://localhost:${port}`);
});
