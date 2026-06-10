'use client';

import { Card, CardContent, CardActions, Button, Chip, Box, Typography } from '@mui/material';
import styles from './NotificationCard.module.css';

export default function NotificationCard({ notification, rank, isViewed, onView }) {
  const typeEmoji = {
    Placement: '💼',
    Result: '📝',
    Event: '🎉'
  }[notification.Type] || '📌';

  const typeColor = {
    Placement: '#667eea',
    Result: '#f59e0b',
    Event: '#10b981'
  }[notification.Type] || '#6b7280';

  return (
    <Card 
      className={isViewed ? styles.viewed : styles.new}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: isViewed ? '1px solid #e0e0e0' : `2px solid ${typeColor}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }
      }}
    >
      {!isViewed && (
        <Box sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: typeColor,
          zIndex: 10
        }} />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {typeEmoji} {notification.Type}
            </Typography>
            {rank && (
              <Typography variant="caption" sx={{ color: '#999' }}>
                Rank #{rank}
              </Typography>
            )}
          </Box>
          {isViewed && (
            <Chip label="Viewed" size="small" variant="outlined" />
          )}
        </Box>

        <Typography variant="body1" sx={{ mb: 1, fontWeight: '500' }}>
          {notification.Message}
        </Typography>

        <Typography variant="caption" sx={{ color: '#666' }}>
          {new Date(notification.Timestamp).toLocaleString()}
        </Typography>

        {notification.score && (
          <Box sx={{ mt: 2, p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="caption" sx={{ display: 'block' }}>
              <strong>Score:</strong> {notification.score}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: '#666' }}>
              Weight: {notification.weight} | Recency: {notification.recency}
            </Typography>
          </Box>
        )}
      </CardContent>

      <CardActions>
        <Button 
          size="small" 
          onClick={onView}
          variant={isViewed ? "outlined" : "contained"}
          sx={{ width: '100%' }}
        >
          {isViewed ? '✓ Viewed' : 'Mark as Viewed'}
        </Button>
      </CardActions>
    </Card>
  );
}
