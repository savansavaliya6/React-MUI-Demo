import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Messageservice from "../Layout/Messageservice";
import { useLocation } from "react-router-dom";
const Login = () => {
    const { state } = useLocation();
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const navigate = useNavigate();
    const onSubmit = (event) => {
        navigate("/dashboard", {
            state: {
                message: 'Login successful!',
                severity: 'success',
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...user, [e.target.email]: e.target.value }))
        setErrors((prevErrors) => ({
            ...prevErrors,
            [email]: value.trim() === "" ? `${email} is required.` : "",
        }));
    };
    const areAllFieldsFilled = (validationSchema.email != "") && (validationSchema.password != "")

    return (
        <>
            {state?.message && (
                <Messageservice
                    message={state?.message}
                    severity={state?.severity}
                />
            )}
            <Container component="main" maxWidth="xs">
                <form noValidate onSubmit={handleSubmit} >
                    <Card elevation={12} style={{ padding: 20, marginTop: 100 }}>
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Login
                            </Typography>
                            <Stack direction="row" spacing={2}>

                                <Avatar alt="Cindy Baker" src="	https://mui.com/static/images/avatar/2.jpg" />
                            </Stack>
                            <Box noValidate sx={{ mt: 1 }}>
                                <TextField
                                    required
                                    id="email"
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    margin="dense"
                                    {...register('email')}
                                    error={errors.email ? true : false}
                                />
                                <Typography variant="inherit" color="error">
                                    {errors.email?.message}
                                </Typography>

                                <TextField

                                    required
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    margin="dense"
                                    {...register('password')}
                                    error={errors.password ? true : false}
                                />
                                <Typography variant="inherit" color="error">
                                    {errors.password?.message}
                                </Typography>
                                <p></p>

                                <FormControlLabel
                                    control={
                                        <Controller
                                            control={control}
                                            name="acceptTerms"
                                            defaultValue="false"
                                            inputRef={register()}
                                            render={({ field: { onChange } }) => (
                                                <Checkbox
                                                    color="primary"
                                                    onChange={e => onChange(e.target.checked)}
                                                />
                                            )}
                                        />
                                    }
                                    label={
                                        <Typography color={errors.acceptTerms ? 'error' : 'inherit'}>
                                            I have read and agree to the Terms *
                                        </Typography>
                                    }
                                />
                                <br />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.acceptTerms
                                        ? '(' + errors.acceptTerms.message + ')'
                                        : ''}
                                </Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={!areAllFieldsFilled}
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Login In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>&nbsp;&nbsp;&nbsp;
                                    <Grid item>
                                        <Link href="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Card>
                    <br />
                </form>
            </Container>
        </>
    );
};

export default Login;
