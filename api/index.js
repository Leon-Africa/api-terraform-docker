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

// Endpoint to update "return_value" in data.json
app.post('/update_return_value', (req, res) => {
    const newValue = req.body.new_value;

    if (!newValue) {
        res.status(400).json({ error: 'new_value not provided in the request' });
        return;
    }

    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const techData = JSON.parse(data).tech || {}; // Ensure tech key exists
        techData.return_value = newValue;

        fs.writeFile('data.json', JSON.stringify({ tech: techData }), (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ message: 'return_value updated successfully' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
