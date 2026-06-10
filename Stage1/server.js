const axios = require('axios');
const express = require('express');
const app = express();

const API = 'http://4.224.186.213/evaluation-service/notifications';

const data = [
  { ID: "1", Type: "Placement", Message: "AMD is hiring!", Timestamp: "2026-06-10 19:00:00" },
  { ID: "2", Type: "Placement", Message: "Goldman Sachs recruiting", Timestamp: "2026-06-10 18:45:00" },
  { ID: "3", Type: "Placement", Message: "Microsoft internship", Timestamp: "2026-06-10 18:15:00" },
  { ID: "4", Type: "Result", Message: "mid-sem results out", Timestamp: "2026-06-10 18:30:00" },
  { ID: "5", Type: "Result", Message: "project scores", Timestamp: "2026-06-10 17:49:00" },
  { ID: "6", Type: "Result", Message: "semester GPA", Timestamp: "2026-06-10 17:00:00" },
  { ID: "7", Type: "Event", Message: "farewell party", Timestamp: "2026-06-10 16:45:00" },
  { ID: "8", Type: "Event", Message: "tech fest", Timestamp: "2026-06-09 14:30:00" }
];

const weights = { Placement: 100, Result: 50, Event: 10 };

function getRecency(timestamp) {
  const age = (new Date() - new Date(timestamp)) / (1000 * 60 * 60);
  return 100 * Math.exp(-age / 24);
}

function getScore(notif) {
  const weight = weights[notif.Type] || 0;
  const recency = getRecency(notif.Timestamp);
  return { weight, recency, total: weight + recency };
}

function addScore(notif) {
  const s = getScore(notif);
  return { ...notif, score: s.total.toFixed(2), weight: s.weight, recency: s.recency.toFixed(2) };
}

async function getNotifications() {
  try {
    const res = await axios.get(API, { timeout: 5000 });
    return res.data.notifications || data;
  } catch (err) {
    return data;
  }
}

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/notifications', async (req, res) => {
  const notifs = await getNotifications();
  const scored = notifs.map(addScore);
  const sorted = scored.sort((a, b) => b.score - a.score);
  const top10 = sorted.slice(0, 10);
  res.json(top10);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}\n`);
});
