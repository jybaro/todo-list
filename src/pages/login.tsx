import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import { UserService } from '../services/user.service';
import { IUserLogin } from '../models/interfaces/user.interface';
import { Alert } from '@mui/material';
import { setUser } from '../reducers/tasks/tasks.actions';

const theme = createTheme();

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const mutation = useMutation(UserService.logIn, {
    onSuccess: (data: IUserLogin | any, x) => {
      if (data.code && data.code !== 200) {
        const messages = Object.keys(data.data).reduce(
          (accum, current) => accum + data.data[current].message,
          ' '
        );
        setErrorMessage((data.message ?? 'Unknown error') + messages);
      } else {
        const user = { ...data.record };
        dispatch(setUser(user));
        navigate('/dashboard');
      }
    },
    onError: (e) => {
      setErrorMessage('Error loging in the user!');
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    const data = new FormData(event.currentTarget);
    mutation.mutate({
      identity: data.get('email')?.toString() ?? '',
      password: data.get('password')?.toString() ?? '',
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {errorMessage !== '' ? (
          <Alert severity="error">{errorMessage}</Alert>
        ) : (
          ''
        )}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
