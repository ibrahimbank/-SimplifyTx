import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Fingerprint,
    Google,
    GitHub,
    Twitter
} from '@mui/icons-material';
import {useAuth} from "@/context/AuthContext";

const LoginPage = () => {
    const theme = useTheme();
    const router = useRouter();
    const { login } = useAuth();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        showPassword: false,
        rememberMe: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [prop]: event.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {

            await new Promise(resolve => setTimeout(resolve, 1000));

            if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
                login('fake-jwt-token', credentials.rememberMe);
                router.push('/');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                p: 3
            }}
        >
            <Card
                sx={{
                    width: '100%',
                    maxWidth: 450,
                    borderRadius: 4,
                    boxShadow: theme.shadows[10],
                    overflow: 'visible'
                }}
            >
                <Box
                    sx={{
                        height: 5,
                        background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)',
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4
                    }}
                />

                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Fingerprint
                            sx={{
                                fontSize: 60,
                                color: theme.palette.primary.main,
                                mb: 1
                            }}
                        />
                        <Typography variant="h5" component="h1" fontWeight="bold">
                            Welcome back
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Sign in to your account to continue
                        </Typography>
                    </Box>

                    {error && (
                        <Box
                            sx={{
                                backgroundColor: theme.palette.error.light,
                                color: theme.palette.error.contrastText,
                                p: 2,
                                borderRadius: 1,
                                mb: 3,
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Typography variant="body2">{error}</Typography>
                        </Box>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            fullWidth
                            label="Email address"
                            margin="normal"
                            variant="outlined"
                            type="email"
                            value={credentials.email}
                            onChange={handleChange('email')}
                            InputProps={{
                                sx: { borderRadius: 2 }
                            }}
                            required
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            margin="normal"
                            variant="outlined"
                            type={credentials.showPassword ? 'text' : 'password'}
                            value={credentials.password}
                            onChange={handleChange('password')}
                            InputProps={{
                                sx: { borderRadius: 2 },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setCredentials({ ...credentials, showPassword: !credentials.showPassword })}
                                            edge="end"
                                        >
                                            {credentials.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            required
                        />

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 1
                        }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={credentials.rememberMe}
                                        onChange={(e) => setCredentials({ ...credentials, rememberMe: e.target.checked })}
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Link href="/forgot-password" variant="body2">
                                Forgot password?
                            </Link>
                        </Box>

                        <Button
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                mt: 3,
                                py: 1.5,
                                borderRadius: 2,
                                fontSize: 16,
                                textTransform: 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none'
                                }
                            }}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </Box>

                    <Divider sx={{ my: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            OR CONTINUE WITH
                        </Typography>
                    </Divider>

                    <Grid container spacing={2}>
                        <Grid size={4}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<Google />}
                                sx={{
                                    borderRadius: 2,
                                    py: 1,
                                    textTransform: 'none'
                                }}
                            >
                                Google
                            </Button>
                        </Grid>
                        <Grid size={4}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<GitHub />}
                                sx={{
                                    borderRadius: 2,
                                    py: 1,
                                    textTransform: 'none'
                                }}
                            >
                                GitHub
                            </Button>
                        </Grid>
                        <Grid size={4}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<Twitter />}
                                sx={{
                                    borderRadius: 2,
                                    py: 1,
                                    textTransform: 'none'
                                }}
                            >
                                Twitter
                            </Button>
                        </Grid>
                    </Grid>

                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Link href="/auth/login" fontWeight="bold">
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>

    );
};

export default LoginPage;