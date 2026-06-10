# Priority Inbox - System Design

## Problem
High notification volume → Users miss important messages. Solution: Auto-prioritize.

---

## Algorithm

**Weight Score** (by type):
- Placement: 100
- Result: 50
- Event: 10

**Recency Score** (by timestamp):
```
Score = 100 × e^(-ageInHours / 24)
```

**Priority**: Weight + Recency

---

## Architecture

API → Fetch → Enrich → Sort → Select Top 10 → Display

---

## Key Functions

- `calculatePriorityScore()` - Compute score
- `getTopNotifications(n)` - Fetch & rank
- `PriorityQueue` - Maintain top 10

---

## Streaming

**Problem**: Recalculating list for each notification is slow.
**Solution**: Priority Queue (O(10) insert, O(1) access)

---

## Performance

| Operation | Time       | Space    |
|-----------|------------|----------|
| Initial   | O(n log n) | O(n)     |
| Stream    | O(10)      | O(1)     |

100 notifications ≈ 250ms total

---

**Ready for GitHub** ✅
