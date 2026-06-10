'use client';

import { useState, useEffect } from 'react';
import { Container, Grid, Slider, CircularProgress, Alert, Box, Typography } from '@mui/material';
import NotificationCard from '@/components/NotificationCard';
import { fetchNotifications } from '@/lib/api';

export default function Priority() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topN, setTopN] = useState(10);
  const [viewedIds, setViewedIds] = useState(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('viewedIds');
    if (saved) setViewedIds(new Set(JSON.parse(saved)));
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [topN]);

  async function loadNotifications() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNotifications({ limit: topN, page: 1 });
      setNotifications(data.slice(0, topN));
    } catch (err) {
      setError('Failed to load priority notifications.');
    }
    setLoading(false);
  }

  function markAsViewed(id) {
    const updated = new Set(viewedIds);
    updated.add(id);
    setViewedIds(updated);
    localStorage.setItem('viewedIds', JSON.stringify(Array.from(updated)));
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <h1>⭐ Priority Notifications (Top {topN})</h1>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ background: '#f5f5f5', p: 3, borderRadius: 2, mb: 4 }}>
        <Typography gutterBottom>Show Top Notifications: {topN}</Typography>
        <Slider
          value={topN}
          onChange={(e, val) => setTopN(val)}
          min={1}
          max={50}
          marks
          valueLabelDisplay="auto"
        />
      </Box>

      <Grid container spacing={2}>
        {notifications.length === 0 ? (
          <Grid item xs={12}>
            <Alert severity="info">No notifications found</Alert>
          </Grid>
        ) : (
          notifications.map((notif, idx) => (
            <Grid item xs={12} sm={6} md={4} key={notif.ID}>
              <NotificationCard 
                notification={notif} 
                rank={idx + 1}
                isViewed={viewedIds.has(notif.ID)}
                onView={() => markAsViewed(notif.ID)}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
