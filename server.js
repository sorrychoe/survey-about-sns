const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/success', (req, res) => {
  const data = req.body;

  console.log('Received survey data:', data);

  res.status(200).send('Survey submitted successfully');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
