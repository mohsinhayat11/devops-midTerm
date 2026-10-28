const request = require('supertest');
const app = require('../app'); // Hamari main app file

describe('Assignment Submission Portal API Tests', () => {

  // Test Case 1: Complete details and a valid submission URL
  it('should save the submission and return success when all details and URL are valid', async () => {
    const validData = {
      name: 'Ali Khan',
      regNo: 'FA20-BCS-001',
      title: 'DevOps Lab Midterm',
      submissionUrl: 'https://github.com/ali/devops-midterm'
    };

    const response = await request(app)
      .post('/api/submissions')
      .send(validData);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe(validData.name);

    // Verify it appears in the list
    const getResponse = await request(app).get('/api/submissions');
    const savedSubmission = getResponse.body.data.find(sub => sub.regNo === validData.regNo);
    expect(savedSubmission).toBeDefined();
  });

  // Test Case 2: Missing registration number
  it('should reject the submission with a validation message if registration number is missing', async () => {
    const missingRegNoData = {
      name: 'Ayesha',
      title: 'DevOps Assignment 2',
      submissionUrl: 'https://github.com/ayesha/assign2'
      // regNo is intentionally missing
    };

    const response = await request(app)
      .post('/api/submissions')
      .send(missingRegNoData);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toMatch(/Validation Error/);
  });

  // Test Case 3: Invalid submission URL
  it('should reject the submission and not save it if the URL is invalid', async () => {
    const invalidUrlData = {
      name: 'Bilal',
      regNo: 'SP21-BSE-045',
      title: 'Docker Setup',
      submissionUrl: 'invalid-url-string' // Invalid URL
    };

    const response = await request(app)
      .post('/api/submissions')
      .send(invalidUrlData);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toMatch(/Invalid submission URL/);

    // Verify it is NOT saved
    const getResponse = await request(app).get('/api/submissions');
    const savedSubmission = getResponse.body.data.find(sub => sub.regNo === invalidUrlData.regNo);
    expect(savedSubmission).toBeUndefined();
  });

});