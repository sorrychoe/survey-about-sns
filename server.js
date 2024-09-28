const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
    const surveyData = req.body;

    if (Array.isArray(surveyData.snsPlatforms)) {
        surveyData.snsPlatforms = surveyData.snsPlatforms;
    } else if (typeof surveyData.snsPlatforms === 'string') {
        surveyData.snsPlatforms = [surveyData.snsPlatforms];
    }

    if (surveyData.otherSns) {
        surveyData.snsPlatforms.push(surveyData.otherSns);
        delete surveyData.otherSns;
    }

    surveyData.timestamp = new Date().toISOString();

    const dataPath = path.join(__dirname, 'data', 'responses.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        let responses = [];
        if (!err && data) {
            responses = JSON.parse(data);
        }

        responses.push(surveyData);

        fs.writeFile(dataPath, JSON.stringify(responses, null, 2), (err) => {
            if (err) {
                console.error('Error writing to responses.json:', err);
                return res.status(500).send('An error occurred while saving your response.');
            }
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Thank You</title>
                    <link rel="stylesheet" href="css/styles.css">
                </head>
                <body>
                    <div class="container">
                        <h1>Thank You for Your Participation!</h1>
                        <p>Your responses have been recorded.</p>
                    </div>
                </body>
                </html>
            `);
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
