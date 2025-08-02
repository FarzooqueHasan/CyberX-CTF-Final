// ====================
// CyberX CTF Server
// ====================

const express = require('express');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const app = express();

// ------------------------
// Middleware & Security
// ------------------------
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'cyberx_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Rate limiting middleware
app.use(rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100
}));

// ------------------------
// Flag Data
// ------------------------
const flags = require('./flags.json');

// ------------------------
// Helper: Score Calculation
// ------------------------
function calculateScore(basePoints, timeTaken) {
  const maxBonusTime = 180;
  const timeBonus = Math.max(0, maxBonusTime - timeTaken);
  return basePoints + Math.floor(timeBonus / 3); // +1 per 3s saved
}

// ------------------------
// Routes
// ------------------------

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Auth Pages
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/signup.html'));
});
app.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/leaderboard.html'));
});
app.get('/wait', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/wait.html'));
});

// ------------------------
// Level Pages (0 to 5)
// ------------------------
app.get('/level:levelId', (req, res) => {
  const levelId = req.params.levelId;
  const levelFile = path.join(__dirname, 'public', `level${levelId}.html`);
  if (fs.existsSync(levelFile)) {
    res.sendFile(levelFile);
  } else {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  }
});

// ------------------------
// Flag Submission (Full)
// ------------------------
app.post('/submitFlag', (req, res) => {
  const { flag, level, timeTaken } = req.body;
  console.log("Received flag submission:", { flag, level, timeTaken });
  if (!flag || !level) {
    return res.status(400).json({ correct: false, message: 'Missing data' });
  }

  const user = req.session.username || 'guest';
  const levelFlags = flags[`level${level}`]?.default || [];

  const isCorrect = levelFlags.includes(flag);
  const isMaster = flag === flags.masterkey;
  const isDecoy = flags.decoys.includes(flag);

  let score = 0;
  let message = 'Incorrect flag. Try again.';

  if (isCorrect || isMaster) {
    score = isMaster ? 150 : calculateScore(100, parseInt(timeTaken) || 180);
    message = isMaster ? 'Master Key Used! +150 points' : 'Correct! Points awarded.';

    // Flags Collected Tracking
    req.session.flagsCollected = req.session.flagsCollected || 0;
    req.session.flagsCollected++;
  } else if (isDecoy) {
    message = 'That was a decoy! No points.';
  }

  req.session.score = req.session.score || 0;
  req.session.score += score;

  // Save score and flagsCollected to user file if logged in
  if (req.session.userId) {
    const userFile = path.join(__dirname, 'users', `${req.session.userId}.json`);
    if (fs.existsSync(userFile)) {
      const userData = JSON.parse(fs.readFileSync(userFile));
      userData.score = req.session.score;
      userData.flagsCollected = req.session.flagsCollected;
      fs.writeFileSync(userFile, JSON.stringify(userData, null, 2));
    }
  }

  // Respond with updated data
  res.json({
    correct: isCorrect || isMaster,
    score,
    message,
    flagsCollected: req.session.flagsCollected || 0,
  });
});

// ------------------------
// Signup & Login
// ------------------------
app.post('/signup', (req, res) => {
  const { id, password, name, className } = req.body;
  const newUser = {
    id,
    password,
    name,
    className,
    score: 0
  };
  fs.writeFileSync(`./users/${id}.json`, JSON.stringify(newUser, null, 2));
  res.redirect('/login');
});

app.post('/login', (req, res) => {
  const { id, password } = req.body;
  try {
    const user = JSON.parse(fs.readFileSync(`./users/${id}.json`, 'utf8'));
    if (user.password === password) {
      req.session.username = user.name;
      req.session.userId = id;
      req.session.score = user.score || 0;
      res.redirect('/instructions.html'); // 👈 Redirect to instructions after successful login
    } else {
      res.send('Incorrect credentials.');
    }
  } catch (err) {
    res.send('User not found.');
  }
});

// ------------------------
// Leaderboard API
// ------------------------
app.get('/api/leaderboard', (req, res) => {
  const usersDir = path.join(__dirname, 'users');
  if (!fs.existsSync(usersDir)) return res.json([]);

  const files = fs.readdirSync(usersDir);
  const leaderboard = files.map(file => {
    const user = JSON.parse(fs.readFileSync(path.join(usersDir, file)));
    return { name: user.name, score: user.score || 0 };
  });

  leaderboard.sort((a, b) => b.score - a.score);
  res.json(leaderboard);
});

// ------------------------
// 404 Fallback
// ------------------------
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

// ------------------------
// Server Start
// ------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
app.use(express.static('public'));
