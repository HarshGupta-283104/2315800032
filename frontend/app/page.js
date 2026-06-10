'use client';

import { useState, useEffect } from 'react';
import { Container, Grid, Button, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress, Alert, Box } from '@mui/material';
import NotificationCard from '@/components/NotificationCard';
import { fetchNotifications } from '@/lib/api';

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [type, setType] = useState('');
  const [viewedIds, setViewedIds] = useState(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('viewedIds');
    if (saved) setViewedIds(new Set(JSON.parse(saved)));
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [page, limit, type]);

  async function loadNotifications() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNotifications({ page, limit, notification_type: type || undefined });
      setNotifications(data);
    } catch (err) {
      setError('Failed to load notifications. Please try again.');
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
      <h1>📧 All Notifications</h1>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Type</InputLabel>
          <Select value={type} label="Type" onChange={(e) => { setType(e.target.value); setPage(1); }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Per Page</InputLabel>
          <Select value={limit} label="Per Page" onChange={(e) => { setLimit(e.target.value); setPage(1); }}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2}>
        {notifications.length === 0 ? (
          <Grid item xs={12}>
            <Alert severity="info">No notifications found</Alert>
          </Grid>
        ) : (
          notifications.map((notif) => (
            <Grid item xs={12} sm={6} md={4} key={notif.ID}>
              <NotificationCard 
                notification={notif} 
                isViewed={viewedIds.has(notif.ID)}
                onView={() => markAsViewed(notif.ID)}
              />
            </Grid>
          ))
        )}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ← Prev
        </Button>
        <span style={{ padding: '8px 12px' }}>Page {page}</span>
        <Button onClick={() => setPage(page + 1)}>
          Next →
        </Button>
      </Box>
    </Container>
  );
}
