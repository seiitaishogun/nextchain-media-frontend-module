import { Box, CircularProgress, SxProps } from '@mui/material';

interface Props {
  sx?: SxProps;
}

function Spinner({ sx }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        ...sx,
      }}
    >
      <CircularProgress size={40} />
    </Box>
  );
}

export default Spinner;
