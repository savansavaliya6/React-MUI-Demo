import React, { useState } from 'react'
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
import { deepOrange, deepPurple } from '@mui/material/colors';
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Register = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        role: Yup.string().required('Role is required'),
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

    const [role, setRole] = React.useState('');
    const navigate = useNavigate();

    const onSubmit = (event) => {
        navigate("/login", {
            state: {
                message: 'Register successful!',
                severity: 'success',
            }
        });
    };

    const handleChange = (e) => {
        
        setRole(e.target.value)
    };

    const areAllFieldsFilled = (validationSchema.email != "") && (validationSchema.password != "") && (validationSchema.role != "")
    
    return (
        <>
            <Container component="main" maxWidth="xs">
                <form noValidate onSubmit={handleSubmit} >
                    <Card elevation={12} style={{ marginTop: 100, padding: 20 }}>
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <br />
                            <Typography component="h1" variant="h5">
                                Register
                            </Typography>
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

                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        required
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="role"
                                        label="Role"
                                        onChange={handleChange}
                                        {...register('role')}
                                        error={Boolean(errors.role) ? true : false}
                                    >
                                        <MenuItem value={10}>Admin</MenuItem>
                                        <MenuItem value={20}>User</MenuItem>
                                        <MenuItem value={30}>Super Admin</MenuItem>
                                    </Select>
                                    {errors.role && (
                                        <Typography variant="inherit" color="error">
                                            {errors.role.message}
                                        </Typography>
                                    )}
                                </FormControl>


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
                                    Register
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            {"Already have an account?"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Card>
                </form>
            </Container>

        </>
    )
}

export default Register