const API_BASE = '/api/notifications';

export async function fetchNotifications(params = {}) {
  try {
    const query = new URLSearchParams();
    
    if (params.limit) query.append('limit', params.limit);
    if (params.page) query.append('page', params.page);
    if (params.notification_type) query.append('notification_type', params.notification_type);

    const url = `${API_BASE}?${query.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Handle both array and object responses
    if (Array.isArray(data)) {
      return data;
    }
    
    if (data.notifications && Array.isArray(data.notifications)) {
      return data.notifications;
    }

    return [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
}
