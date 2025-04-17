import React from 'react';
import {
    Alert,
    Box,
    Button,
    Typography,
    Collapse,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ErrorMessageProps {
    message: string;
    retryFn?: () => void;
    severity?: 'error' | 'warning' | 'info';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
                                                       message,
                                                       retryFn,
                                                       severity = 'error'
                                                   }) => {
    const [open, setOpen] = React.useState(true);

    return (
        <Box sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 1400,
            width: { xs: '90%', sm: '400px' },
            maxWidth: 'calc(100% - 32px)'
        }}>
            <Collapse in={open}>
                <Alert
                    severity={severity}
                    action={
                        <>
                            {retryFn && (
                                <Button
                                    color="inherit"
                                    size="small"
                                    onClick={retryFn}
                                >
                                    Retry
                                </Button>
                            )}
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => setOpen(false)}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        </>
                    }
                    sx={{
                        alignItems: 'center',
                        boxShadow: 3,
                        '& .MuiAlert-message': {
                            flexGrow: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }
                    }}
                >
                    <Typography variant="body1" component="div">
                        {message}
                    </Typography>
                </Alert>
            </Collapse>
        </Box>
    );
};

export default ErrorMessage;