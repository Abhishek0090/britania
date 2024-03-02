/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useFreelancerLoginMutation } from '~/features/auth/authApiSlice';
import { setFreelancerCredentials } from '~/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { LucideLock, LucideEye, LucideEyeOff } from 'lucide-react';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';

//Form schema
const formSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('You forgot to enter your password'),
});

export default function FreelancerLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loginIn] = useFreelancerLoginMutation();
  //formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      showPassword: false,
    },
    onSubmit: (values) => {
      setLoading(true);
      const data = {
        email: values.email,
        password: values.password,
      };
      loginIn(data)
        .unwrap()
        .then((res) => {
          console.log('res', res);
          if (res?.status !== null) {
            toast.success(res?.message);
            dispatch(setFreelancerCredentials(res));
            setLoading(false);
            navigate('/dashboard/freelancer/dashboard');
          } else {
            setLoading(false);
            toast.error(res?.message);
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err?.message);
        });
    },
    validationSchema: formSchema,
  });

  const handleClickShowPassword = () => {
    formik.setFieldValue('showPassword', true);
  };
  const handleMouseDownPassword = () => {
    formik.setFieldValue('showPassword', false);
  };

  return (
    <>
      <Helmet>
        <title>Login Freelancer | Bluepen</title>
      </Helmet>
      <Container
        maxWidth="sm"
        className="py-10 shadow-2xl backdrop-blur-3xl drop-shadow-2xl rounded-xl  md:my-20"
      >
        <div className="flex flex-col justify-center mx-4 text-center ">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full ">
              <Typography
                align="center"
                variant="h3"
                fontWeight="bold"
                gutterBottom
              >
                Freelancer Login
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                {/* display err */}

                <FormControl
                  sx={{ m: 1, width: '34ch' }}
                  variant="outlined"
                  required
                >
                  <InputLabel htmlFor="outlined-adornment-email">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    error={Boolean(formik.errors.email)}
                    required
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="on"
                    label="Email"
                    sx={{ borderRadius: '1000px' }}
                    value={formik.values.email}
                    onChange={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                  />
                </FormControl>
                <FormControl
                  sx={{ m: 1, width: '34ch' }}
                  variant="outlined"
                  required
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    sx={{
                      borderRadius: '1000px',
                    }}
                    autoComplete="on"
                    error={Boolean(formik.errors.password)}
                    value={formik.values.password}
                    onChange={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    icon={<LucideLock />}
                    name="password"
                    type={formik.values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {formik.values.showPassword ? (
                            <LucideEye />
                          ) : (
                            <LucideEyeOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={<LoginIcon />}
                  sx={{
                    bgcolor: '#2956A8',
                    color: '#fff',
                    mt: 2,
                    py: 2,
                    width: '38ch',
                    borderRadius: '1000px',

                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#000',
                    },
                  }}
                >
                  Login
                </LoadingButton>
              </form>

              <div className="p-2 mt-4">
                <Link
                  to="/auth/forgot-password-freelancer"
                  className="font-medium text-blue141 hover:text-blue111"
                >
                  Forgot Password ?
                </Link>
              </div>
              <div className="p-2 font-medium">
                Don't have an account ?
                <Link
                  to="/freelance"
                  className="p-2 font-medium text-blue141 hover:text-blue111"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
