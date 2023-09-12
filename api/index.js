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

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
