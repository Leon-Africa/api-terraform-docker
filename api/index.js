const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const os = require('os');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to get server load and available disk space
app.get('/server_info', (req, res) => {
    // Calculate the average load
    const load = os.loadavg();
    const averageLoad = load[0]; // 1-minute load average

    // Calculate available disk space
    const diskSpace = os.freemem() / (1024 * 1024); // Convert to MB

    res.json({
        average_load: averageLoad,
        available_disk_space_MB: diskSpace,
    });
});

// Endpoint to get "return_value" from data.json
app.get('/return_value', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const techData = JSON.parse(data).tech || {}; // Ensure tech key exists
        const returnValue = techData.return_value;
        res.json({ return_value: returnValue });
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
