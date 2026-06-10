# Priority Inbox - Campus Notifications

## 🎯 Overview

Intelligent notification system that ranks notifications by weight (type) and recency (timestamp).

---

## ⚡ Core Algorithm

**Weight**: Placement(100) > Result(50) > Event(10)
**Recency**: Score = 100 × e^(-hours/24)
**Priority**: Weight + Recency

Example: Fresh Placement = 100 + 97 = 197 ⭐

---

## 🚀 Quick Start

```bash
npm install
npm start
```

---

## 📊 Output

Top 10 notifications ranked by priority with score breakdown.

---

## ⚙️ Configure

```javascript
// Adjust weights
WEIGHT_MAP = { Placement: 100, Result: 50, Event: 10 }

// Adjust recency (hours)
e^(-ageInHours / 24)
```

---

## 📈 Performance

Initial: O(n log n) | Stream: O(10) | Space: O(10)

---

**Status**: ✅ Complete | **v1.0.0**
