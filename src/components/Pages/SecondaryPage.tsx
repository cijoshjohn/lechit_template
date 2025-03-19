import { Box, Paper } from '@mui/material';

// function Item(props: BoxProps) {
//   const { sx, ...other } = props;
//   return (
//     <Box
//       sx={[
//         (theme) => ({
//           p: 1,
//           m: 1,
//           bgcolor: 'grey.100',
//           color: 'grey.800',
//           border: '1px solid',
//           borderColor: 'grey.300',
//           borderRadius: 2,
//           fontSize: '0.875rem',
//           fontWeight: '700',
//           ...theme.applyStyles('dark', {
//             bgcolor: '#101010',
//             color: 'grey.300',
//             borderColor: 'grey.800',
//           }),
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     />
//   );
// }

const MyComponent = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 1,
          m: 1,
          borderRadius: 1,
          gap: 4,
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        <Paper elevation={3} sx={{ width: '20%', height: '40vh', padding: 6, spacing: 4 }}>
          {/* Your content here */}
        </Paper>
        <Paper elevation={3} sx={{ width: '60%', height: '92vh', padding: 6, spacing: 4 }}>
          {/* Your content here */}
        </Paper>
        <Paper elevation={3} sx={{ width: '20%', height: '40vh', padding: 6, spacing: 4 }}>
          {/* Your content here */}
        </Paper>
      </Box>
    </>
  );
};

export default MyComponent;
