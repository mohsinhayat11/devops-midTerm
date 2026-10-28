const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
// Body parser to handle incoming JSON data from GitHub Actions
app.use(express.json({ limit: '10mb' }));

const PORT = 4000; // Hum port 4000 use kar rahe hain taake main app (3000) se conflict na ho

// Webhook endpoint to receive the report
app.post('/webhook', (req, res) => {
  console.log('\n[+] New test report received from GitHub Actions CI Pipeline!');
  
  const reportData = req.body;
  
  // File path jahan report save karni hai requirement ke mutabiq
  const filePath = path.join(__dirname, 'test-report.json');

  // JSON format mein file save karna
  fs.writeFile(filePath, JSON.stringify(reportData, null, 2), (err) => {
    if (err) {
      console.error('[-] Error saving the report:', err);
      return res.status(500).send('Error saving report');
    }
    console.log('[+] Success: Report saved as test-report.json on your computer.');
    return res.status(200).send('Report received and saved.');
  });
});

app.listen(PORT, () => {
  console.log(`Local Receiver Server is running on http://localhost:${PORT}`);
  console.log(`Waiting for CI reports on http://localhost:${PORT}/webhook ...`);
});