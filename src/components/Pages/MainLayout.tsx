import { Box, Paper } from '@mui/material';

const MyComponent = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          p: 4,
        }}
      >
        <Paper elevation={3} sx={{ width: '100%', height: '45vh', padding: 4 }}>
          {/* Your content here */}
        </Paper>
      </Box>

      <Box
        sx={{
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
          height: '45vh',
          p: 4,
          gap: 4,
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        <Paper elevation={3} sx={{ width: '100%', height: '40vh', padding: 6, spacing: 4 }}>
          {/* Your content here */}
        </Paper>
        <Paper elevation={3} sx={{ width: '100%', height: '40vh', padding: 6, spacing: 4 }}>
          {/* Your content here */}
        </Paper>
        <Paper elevation={3} sx={{ width: '100%', height: '40vh', padding: 6, spacing: 4 }}>
          {/* Your content here */}
        </Paper>
      </Box>
    </>
  );
};

export default MyComponent;
