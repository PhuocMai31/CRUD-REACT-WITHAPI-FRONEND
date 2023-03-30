import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from "../../Components/Layout/Copyright";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../../service/axios";
import {Alert} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setUserLogin} from "../../redux/features/auth/authSlice";
import authService from "../../service/auth.service";

const data = [
    {
        id: 1,
        email: 'admin@gmail.com',
        password: '1234'
    },
    {
        id: 2,
        email: 'user@gmail.com',
        password: '1234'
    }
]

const theme = createTheme();

export default function SignIn() {

    const [errMessage, setErrMessage] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let account = {
            username: data.get('email'),
            password: data.get('password'),
        }

        axios.post('/login', account).then(res => {
           if (res.data.status == 'error') {
               setErrMessage(res.data.message);
           } else {
               localStorage.setItem('token', res.data.accessToken)
               axios.get('/user-login' ).then(response => {
                   dispatch(setUserLogin(response.data))
                   navigate('/admin/dashboard')
               })

           }
        }).catch(err => {
        })
    };

    useEffect(() => {
        if (auth.isLogined) {
            navigate('/admin/dashboard')
        }
    }, [auth])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
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
                        Sign in
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        { errMessage && (
                            <>
                                <Alert severity="error">{errMessage}</Alert>
                            </>
                        )}
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
