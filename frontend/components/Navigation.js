'use client';

import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Button 
                sx={{ 
                  color: pathname === '/' ? '#fff' : 'rgba(255,255,255,0.7)',
                  fontSize: '1.2em',
                  fontWeight: 'bold',
                  mr: 2
                }}
              >
                🏆 Priority Inbox
              </Button>
            </Link>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Button 
                sx={{ 
                  color: pathname === '/' ? '#fff' : 'rgba(255,255,255,0.7)',
                  fontWeight: pathname === '/' ? 'bold' : 'normal'
                }}
              >
                📧 All
              </Button>
            </Link>

            <Link href="/priority" style={{ textDecoration: 'none' }}>
              <Button 
                sx={{ 
                  color: pathname === '/priority' ? '#fff' : 'rgba(255,255,255,0.7)',
                  fontWeight: pathname === '/priority' ? 'bold' : 'normal'
                }}
              >
                ⭐ Priority
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
