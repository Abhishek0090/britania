/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import RPI from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import OTPEmail from '~/components/OTPInput/OTPEmail';
import OTPPhone from '~/components/OTPInput/OTPPhone';
import { useTechnicalFreelancerSignUpMutation } from '~/features/freelancer/freelancerApiSlice';
import {
  clearFreelancerFormData,
  setTechnicalFreelancerFormData,
} from '~/features/freelancer/freelancerSlice';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CheckIcon from '@mui/icons-material/Check';
import {URL} from "~/utils/BaseURL"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const PhoneInput = RPI.default ? RPI.default : RPI;

const formSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Please enter your email address'),

  firstname: Yup.string().required('Please enter your first name'),
  lastname: Yup.string().required('Please enter your last name'),
  address: Yup.string().required('Please enter your address'),
  street: Yup.string().required('Please enter your street address'),
  city: Yup.string().required('Please enter your city'),
  state: Yup.string().required('Please enter your state'),
  gender: Yup.string().required('Gender is required'),
  pincode: Yup.string()
    .min(6, 'Pincode must be 6 digits')
    .max(6, 'Pincode must be 6 digits')
    .required('Please enter your pincode')
    .matches(/^[0-9]+$/, 'Only numbers are allowed for this field '),
  // phone: Yup.string()
  //   .required('It is important for contact purposes')
  //   .min(12, 'Phone number must be 10 digits')
  //   .max(12, 'Phone number must be 10 digits'),
  whatsapp: Yup.string()
    .required('Please enter your whatsapp number')
    .min(10, 'Please enter a valid whatsapp number')
    .max(12, 'Please enter a valid whatsapp number'),

  terms: Yup.boolean().oneOf([true], 'Please accept our terms and conditions'),
});

export default function PersonalDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const freelancerData = useSelector(
    (state) => state.freelancer.technicalFreelancerFormData
  );
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [country, setCountry] = useState('India');
  const [countryCode, setCountryCode] = useState('91');
  const [countryCodeLength, setCountryCodeLength] = useState(10);

  const [freelancerSignUp] = useTechnicalFreelancerSignUpMutation();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      showPassword: false,
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      whatsapp: '',
      country_name: '',
      country_code: '',
      gender: '',
      address: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      terms: false,
    },
    onSubmit: async (values) => {
      setLoading(true);

      await freelancerSignUp({
        ...freelancerData,
        firstname: values?.firstname,
        lastname: values?.lastname,
        email: values?.email,
        country_name: country,
        country_code: countryCode,
        number: values?.phone?.replace(countryCode, ''),
        whatsapp: values?.whatsapp,
        gender: values?.gender,
        terms: values?.terms,
        address: values?.address,
        street: values?.street,
        city: values?.city,
        state: values?.state,
        pincode: values?.pincode,
        submit: 'submit',
      })
        .unwrap()
        .then((res) => {
          console.log('res', res);
          if (res?.status === 200) {
            localStorage.clear();
            dispatch(clearFreelancerFormData());
            toast.success(res?.message);
            navigate('/', { replace: true });
          } else toast.error(res?.message);
        })
        .catch((err) => {
          console.log('err', err);
        });
      setLoading(false);
    },

    validationSchema: formSchema,
  });

  const handleCheck = () => {
    if (freelancerData?.domains === null) {
      toast.error('Please fill previous form first');
      navigate('/freelance/step3');
      return;
    } else if (freelancerData?.role === null) {
      toast.error('Please fill previous form first');
      navigate('/freelance/step2');
      return;
    } else if (freelancerData?.assignment_type === null) {
      toast.error('Please fill previous form first');
      navigate('/freelance/freelancer/technical/step1');
      return;
    } else if (freelancerData?.qualification === null) {
      toast.error('Please fill previous form first');
      navigate('/freelance/freelancer/technical/step1');
      return;
    } else if (freelancerData?.working_hours === null) {
      toast.error('Please fill previous form first');
      navigate('/freelance/freelancer/technical/step1');
      return;
    } else if (freelancerData?.subject_tags === null) {
      toast.error('Please fill previous form first');
      navigate('/freelance/freelancer/technical/step1');
      return;
    } else if (freelancerData?.past_work_files === null) {
      toast.error('Please fill previous form first');
      navigate('/freelance/freelancer/technical/step1');
      return;
    } else if (freelancerData?.past_experience === null) {
      toast.error('Please fill previous form first');
      navigate('/freelance/freelancer/technical/step2');
      return;
    } else if (freelancerData?.work_links === null) {
      toast.error('Please fill previous form first');
      navigate('/freelance/freelancer/technical/step2');
      return;
    } else if (freelancerData?.linkedin === null) {
      toast.error('Please fill previous form first');
      navigate('/freelance/freelancer/technical/step2');
      return;
    } else if (freelancerData?.resume === null) {
      toast.error('Please fill previous form first');
      navigate('/freelance/freelancer/technical/step3');
      return;
    } else {
      navigate('/freelance/freelancer/technical/personalDetails');
      return;
    }
  };

  const handleCheckValid = () => {
    let data = {
      email: formik.values?.email,
      email_verified: freelancerData?.email_verified,
      country_name: country,
      country_code: Number(countryCode),
      number: Number(formik?.values?.phone?.replace(countryCode, '')),
      number_verified:
        country === 'India' ? freelancerData?.number_verified : 1,
      role: freelancerData?.role,
    };
    axios
      .post(
        `${URL}/freelancer/freelancersignupcheck.php`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        if (res?.data?.status === 200) {
          toast.success(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
          navigate('/', { replace: true });
        }
        setHidden(false);
        console.log(res?.data);
      })
      .catch((err) => {
        setHidden(false);
        console.log(err);
      });
  };

  const handleFormBlur = (fieldName) => {
    if (formik.errors[fieldName]) {
      toast.error(formik.errors[fieldName]);
      return;
    }
    formik.setFieldValue(fieldName, formik.values[fieldName]);
  };

  useEffect(() => {
    handleCheck();
  }, []);

  useEffect(() => {
    if (
      (window.onbeforeunload = function () {
        return true;
      })
    )
      dispatch(
        setTechnicalFreelancerFormData({
          ...freelancerData,
          email_verified: null,
          number_verified: null,
        })
      );
  }, []);


  
  console.log(formik?.values?.phone?.replace(countryCode, "")?.length);
  
  console.log(countryCodeLength);

  return (
    <>
      <div
        className={` max-w-3xl mx-auto  backdrop-blur-2xl  drop-shadow shadow-2xl rounded-xl py-10   ${
          hidden ? 'md:my-20 pb-36' : 'md:my-10 pb-0'
        }`}
      >
        <div className="flex flex-col px-10 rounded-lg ">
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-left text-gray-900 ">
              {!hidden ? 'Personal ' : 'Contact '} Details
            </h5>
            <form onSubmit={formik.handleSubmit}>
              <>
                <div className="flex flex-col items-center md:flex-row">
                  <FormControl
                    sx={{ m: 1, width: '34ch' }}
                    variant="outlined"
                    required
                    disabled={
                      !hidden || freelancerData?.email_verified === 1
                        ? true
                        : false
                    }
                  >
                    <InputLabel htmlFor="outlined-adornment-email">
                      Email
                    </InputLabel>
                    <OutlinedInput
                      error={formik.errors.email && formik.touched.email}
                      required
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="on"
                      label="Email"
                      sx={{ borderRadius: '1000px' }}
                      value={formik.values.email}
                      onChange={formik.handleChange('email')}
                      onBlur={() => handleFormBlur('email')}
                    />
                  </FormControl>
                  {/* OTP Section */}
                  <div className="md:hidden block">
                    {hidden ? (
                      <OTPEmail
                        category="technical"
                        validEmail={
                          formik.values.email.length > 0 &&
                          formik.values.email.match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                          )
                        }
                      />
                    ) : null}
                  </div>
                  <FormControl
                    sx={{
                      m: 1,
                      width: '34ch',
                    }}
                  >
                    <PhoneInput
                      country={'in'}
                      inputStyle={{
                        background: 'none',
                        borderRadius: '1000px',
                        border: '1px solid #C4C4C4',
                      }}
                      isValid={(value, country) => {
                        let codeSplit = country?.format?.split(' ');
                        let countryCode = codeSplit
                          ?.slice(1, codeSplit?.length)
                          ?.join('');

                        let temp = [];
                        for (let i = 0; i < countryCode?.length; i++) {
                          if (countryCode[i] === '.') {
                            temp.push(countryCode[i]);
                          }
                        }
                        setCountryCodeLength(temp?.length);

                        setCountry(country?.name);
                        setCountryCode(country?.countryCode);
                        if (value.length < 10) {
                          return false;
                        } else if (value.match(/12345/)) {
                          return (
                            'Invalid value: ' + value + ', ' + country?.name
                          );
                        } else if (value.match(/1234/)) {
                          return false;
                        } else {
                          return true;
                        }
                      }}
                      copyNumbersOnly={true}
                      showDropdown={false}
                      value={formik.values.phone}
                      onChange={(p) => formik.setFieldValue('phone', p)}
                      onBlur={formik.handleBlur('phone')}
                      error={Boolean(formik.errors.phone)}
                      disabled={!hidden ? true : false}
                    />
                  </FormControl>
                  <div className="md:hidden block">
                    {hidden ? (
                      <>
                        {countryCode === '91' ? (
                          <OTPPhone
                            category="technical"
                            phone={formik.values.phone?.length}
                            phoneNumber={formik.values?.phone?.replace(
                              countryCode,
                              ''
                            )}
                          />
                        ) : (
                          <div className="h-28"></div>
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
                {/* OTP Section */}
                <div className="flex justify-center items-center gap-x-28">
                  <div className="hidden md:block ">
                    {/* OTP Section */}
                    <div className="w-40"></div>
                    <OTPEmail
                      category="technical"
                      validEmail={
                        formik.values.email.length > 0 &&
                        formik.values.email.match(
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        )
                      }
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="w-32"></div>
                    {countryCode === '91' ? (
                      <OTPPhone
                        category="technical"
                        phone={formik.values.phone?.length}
                        phoneNumber={formik.values?.phone?.replace(
                          countryCode,
                          ''
                        )}
                      />
                    ) : (
                      <div className="h-28 w-40"></div>
                    )}
                  </div>
                </div>

                {/* Number Number */}
                {!hidden ? null : (
                  <div className="flex items-center justify-center">
                    <LoadingButton
                      // disabled={formik.isSubmitting}
                      disabled={
                        country === 'India'
                          ? freelancerData?.email_verified === 1 &&
                            freelancerData?.number_verified === 1 &&
                            formik?.values?.phone?.replace(countryCode, '')
                              ?.length === countryCodeLength
                            ? false
                            : true
                          : freelancerData?.email_verified === 1 &&
                            formik?.values?.phone?.replace(countryCode, '')
                              ?.length
                          ? false
                          : true
                      }
                      loading={loading}
                      onClick={() => handleCheckValid()}
                      startIcon={<CheckIcon />}
                      variant="contained"
                      color="primary"
                      //   type="submit"
                      sx={{
                        bgcolor: '#2956A8',
                        color: '#fff',
                        mt: 2,
                        mb: 2,
                        py: 2,
                        width: '38ch',
                        borderRadius: '1000px',

                        '&:hover': {
                          backgroundColor: '#fff',
                          color: '#000',
                        },
                      }}
                    >
                      Confirm
                    </LoadingButton>
                  </div>
                )}
              </>
              {hidden ? null : (
                <>
                  {/* FirstName && LastName */}
                  <div className="flex flex-col items-center md:flex-row">
                    <FormControl
                      sx={{ m: 1, width: '34ch' }}
                      variant="outlined"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-name">
                        First Name
                      </InputLabel>
                      <OutlinedInput
                        autoFocus
                        error={
                          formik.errors.firstname && formik.touched.firstname
                        }
                        required
                        id="name"
                        sx={{ borderRadius: '1000px' }}
                        value={formik.values.firstname}
                        onChange={formik.handleChange('firstname')}
                        onBlur={() => handleFormBlur('firstname')}
                        type="text"
                        label="First Name"
                      />
                    </FormControl>

                    <FormControl
                      sx={{ m: 1, width: '34ch' }}
                      variant="outlined"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-name">
                        Last Name
                      </InputLabel>
                      <OutlinedInput
                        error={
                          formik.errors.lastname && formik.touched.lastname
                        }
                        required
                        sx={{ borderRadius: '1000px' }}
                        value={formik.values.lastname}
                        onChange={formik.handleChange('lastname')}
                        onBlur={() => handleFormBlur('lastname')}
                        type="text"
                        label="Last Name"
                      />
                    </FormControl>
                  </div>
                  <div className="flex flex-col items-center md:flex-row">
                    <FormControl
                      sx={{ m: 1, width: '34ch' }}
                      variant="outlined"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-name">
                        Whatsapp Number
                      </InputLabel>
                      <OutlinedInput
                        max={10}
                        error={
                          formik.errors.whatsapp && formik.touched.whatsapp
                        }
                        required
                        sx={{ borderRadius: '1000px' }}
                        value={formik.values.whatsapp}
                        onChange={formik.handleChange('whatsapp')}
                        onBlur={() => handleFormBlur('whatsapp')}
                        type="number"
                        label="Whatsapp Number"
                        startAdornment={
                          <InputAdornment position="start">
                            <img src="https://img.icons8.com/color/48/null/whatsapp--v1.png" />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      required
                      sx={{
                        m: 1,
                        width: '34ch',
                        ml: 3,
                      }}
                    >
                      <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formik.values.gender}
                        onChange={formik.handleChange('gender')}
                        onBlur={() => handleBlur('gender')}
                      >
                        <FormControlLabel
                          value="Female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="Male"
                          control={<Radio />}
                          label="Male"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="flex flex-col items-center md:flex-row">
                    <FormControl
                      sx={{ m: 1, width: '34ch' }}
                      variant="outlined"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-name">
                        Address
                      </InputLabel>
                      <OutlinedInput
                        error={formik.errors.address && formik.touched.address}
                        required
                        sx={{ borderRadius: '1000px' }}
                        value={formik.values.address.address}
                        onChange={formik.handleChange('address')}
                        onBlur={() => handleFormBlur('address')}
                        type="text"
                        label="Address"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: '34ch' }}
                      variant="outlined"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-name">
                        Street
                      </InputLabel>
                      <OutlinedInput
                        error={formik.errors.street && formik.touched.street}
                        required
                        sx={{ borderRadius: '1000px' }}
                        value={formik.values.street}
                        onChange={formik.handleChange('street')}
                        onBlur={() => handleFormBlur('street')}
                        type="text"
                        label="Street"
                      />
                    </FormControl>
                  </div>
                  <div className="flex flex-col items-center md:flex-row">
                    <FormControl
                      sx={{ m: 1, width: '34ch' }}
                      variant="outlined"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-name">
                        City
                      </InputLabel>
                      <OutlinedInput
                        error={formik.errors.city && formik.touched.city}
                        required
                        sx={{ borderRadius: '1000px' }}
                        value={formik.values.city}
                        onChange={formik.handleChange('city')}
                        onBlur={() => handleFormBlur('city')}
                        type="text"
                        label="City"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: '34ch' }}
                      variant="outlined"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-name">
                        State
                      </InputLabel>
                      <OutlinedInput
                        error={formik.errors.state && formik.touched.state}
                        required
                        sx={{ borderRadius: '1000px' }}
                        value={formik.values.state}
                        onChange={formik.handleChange('state')}
                        onBlur={() => handleFormBlur('state')}
                        type="text"
                        label="State"
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: '34ch' }}
                      variant="outlined"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-name">
                        Pincode
                      </InputLabel>
                      <OutlinedInput
                        error={formik.errors.pincode && formik.touched.pincode}
                        required
                        sx={{ borderRadius: '1000px' }}
                        value={formik.values.pincode}
                        onChange={formik.handleChange('pincode')}
                        onBlur={() => handleFormBlur('pincode')}
                        type="text"
                        label="Pincode"
                      />
                    </FormControl>
                  </div>
                  <div className="flex  items-center justify-center">
                    {/* Terms and Conditions */}
                    <FormControlLabel
                      sx={{ mb: 1, mt: 4, width: '34ch' }}
                      control={
                        <Checkbox
                          error={formik.errors.terms && formik.touched.terms}
                          checked={formik.values.terms}
                          onChange={formik.handleChange('terms')}
                          onBlur={() => handleFormBlur('terms')}
                          name="terms"
                          sx={{
                            color: '#6F9CEB',
                            '&.Mui-checked': {
                              color: '#6F9CEB',
                            },
                          }}
                        />
                      }
                      label={
                        <span className="text-sm text-left text-gray-400 flex flex-col ">
                          <span>
                            I agree to the{' '}
                            <Link to="/terms" className="text-blue-500">
                              Terms and Conditions
                            </Link>
                          </span>
                        </span>
                      }
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <LoadingButton
                      onClick={formik.handleSubmit}
                      loading={loading}
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={<HowToRegIcon />}
                      sx={{
                        bgcolor: '#2956A8',
                        color: '#fff',
                        mt: 2,
                        mb: 2,
                        py: 2,
                        width: '38ch',
                        borderRadius: '1000px',
                        '&:hover': {
                          backgroundColor: '#fff',
                          color: '#000',
                        },
                      }}
                    >
                      Sign up
                    </LoadingButton>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
