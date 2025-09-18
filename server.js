const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 3000;

// Use CORS to allow frontend communication
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer - store files in memory for simplicity
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint to process uploaded file or text
app.post('/simplify-report', upload.single('reportFile'), (req, res) => {
  let reportText = '';

  if (req.file) {
    if (req.file.mimetype === 'text/plain') {
      reportText = req.file.buffer.toString('utf8');
    } else {
      return res.status(400).json({ error: 'Only plain text (.txt) files supported in this demo.' });
 }
  } else if (req.body.text) {
    reportText = req.body.text;
  } else {
    return res.status(400).json({ error: 'No report file or text provided.' });
  }

  const simplified = simplifyReport(reportText);
  res.json({ simplified });
});

function simplifyReport(text) {
  const explanations = [];

  const lowerText = text.toLowerCase();

  if (lowerText.includes('hemoglobin') && lowerText.includes('low')) {
    explanations.push('Your hemoglobin is low; this may suggest anemia.');
  }
  if (lowerText.includes('cholesterol') && lowerText.includes('high')) {
    explanations.push('Your cholesterol is high; consider dietary changes.');
  }
  if ((lowerText.includes('wbc') || lowerText.includes('white blood cell')) && lowerText.includes('high')) {
    explanations.push('High white blood cells may indicate infection.');
  }

  if (explanations.length === 0) {
    explanations.push('Report looks normal or no known issues detected.');
  }

  return explanations.join(' ');
}

app.listen(port, () => {
 console.log(`Server started at http://localhost:${port}`);
});
