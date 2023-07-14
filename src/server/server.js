const { google } = require('googleapis');
const express = require('express');
const session = require('express-session');
const { OAuth2Client } = require('google-auth-library');

const app = express();

// Set up session middleware
app.use(
  session({
    secret: 'YOUR_SESSION_SECRET',
    resave: false,
    saveUninitialized: true,
  })
);

// Set up Google OAuth2 client
const oauth2Client = new OAuth2Client({
  clientId: '1052664445707-fc4ncjjb3v1vd54pgste2abgfefsb05s.apps.googleusercontent.com',
  clientSecret: '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',
  redirectUri: 'YOUR_REDIRECT_URI',
});

// Set up the Google Fit API
const fitness = google.fitness({
  version: 'v1',
  auth: oauth2Client,
});

// Redirect to Google OAuth2 consent screen
app.get('/auth/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/fitness.activity.read'],
  });
  res.redirect(authUrl);
});

// Handle Google OAuth2 callback
app.get('/auth/google/callback', async (req, res) => {
  const { tokens } = await oauth2Client.getToken(req.query.code);
  oauth2Client.setCredentials(tokens);

  res.redirect('/stepCount');
});

// Retrieve step count
app.get('/stepCount', async (req, res) => {
  try {
    const result = await fitness.users.dataset.aggregate({
      userId: 'me',
      requestBody: {
        aggregateBy: [
          {
            dataTypeName: 'com.google.step_count.delta',
            dataSourceId:
              'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
          },
        ],
        bucketByTime: { durationMillis: 86400000 }, // 24 hours
        startTimeMillis: Date.now() - 86400000, // Past 24 hours
        endTimeMillis: Date.now(), // Current time
      },
    });

    const stepCount =
      result.data.bucket[0].dataset[0].point[0].value[0].intVal;

    res.json({ stepCount });
  } catch (error) {
    console.error('Error retrieving step count:', error);
    res.status(500).json({ error: 'Error retrieving step count' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
