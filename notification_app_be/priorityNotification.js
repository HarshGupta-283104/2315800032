const data = require("./sampleData.json");

const notifications = data.notifications;

const WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function calculateScore(notification) {
  const weight = WEIGHTS[notification.Type] || 0;

  const timestamp =
    new Date(notification.Timestamp).getTime();

  return {
    ...notification,
    score: weight * 1000000000000 + timestamp
  };
}

function getTopNotifications(
  notifications,
  limit = 10
) {
  return notifications
    .map(calculateScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

const top10 = getTopNotifications(notifications);

console.log("TOP PRIORITY NOTIFICATIONS\n");

console.table(
  top10.map(n => ({
    Type: n.Type,
    Message: n.Message,
    Timestamp: n.Timestamp
  }))
);