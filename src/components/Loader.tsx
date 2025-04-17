import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loader = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                gap: 2,
                backgroundColor: 'background.paper'
            }}
        >
            <CircularProgress
                size={60}
                thickness={4}
                color="primary"
                sx={{
                    animationDuration: '1000ms'
                }}
            />
            <Typography variant="h6" color="text.secondary">
                Loading transactions...
            </Typography>
        </Box>
    );
};

export default Loader;