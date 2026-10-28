const express = require('express');
const cors = require('cors');
const path = require('path'); // <-- Added path module

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static frontend files (index.html) from project root
app.use(express.static(path.join(__dirname))); // <-- Added this line

// In-memory array to store saved submissions
const submissions = [];

// Helper function to validate URLs using standard URL constructor
function isValidUrl(string) {
  try {
    const parsed = new URL(string);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

// Route to serve frontend explicitly on GET /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// GET Route: Fetch all saved submissions
app.get('/api/submissions', (req, res) => {
  return res.status(200).json({ success: true, data: submissions });
});

// POST Route: Submit assignment with validations
app.post('/api/submissions', (req, res) => {
  const { name, regNo, title, submissionUrl } = req.body;

  // Validation 1: Required fields check
  if (!name || !regNo || !title || !submissionUrl) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: All fields (name, regNo, title, submissionUrl) are required.'
    });
  }

  // Validation 2: URL format check
  if (!isValidUrl(submissionUrl)) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Invalid submission URL provided.'
    });
  }

  // Save valid submission
  const newSubmission = {
    id: submissions.length + 1,
    name,
    regNo,
    title,
    submissionUrl,
    submittedAt: new Date().toISOString()
  };

  submissions.push(newSubmission);

  return res.status(201).json({
    success: true,
    message: 'Submission saved successfully!',
    data: newSubmission
  });
});

module.exports = app;