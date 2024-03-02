import { useState, useEffect } from 'react';
import { LucideChevronRight, LucideChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
} from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const linkedinProfileRegex = new RegExp(
  /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/gm
);

const linkRegex = new RegExp(
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
);

const validationSchemaNonTech = Yup.object({
  typing_speed: Yup.string().required('Typing speed is required'),
  past_experience: Yup.string()
    .max(500000, 'Must be 50 characters or less')
    .required('Past experience is required'),
  work_links: Yup.string()
    .matches(linkRegex, 'Please enter a valid link')
    .required('Please enter a valid link'),
  linkedin: Yup.string()
    .matches(linkedinProfileRegex, 'Please enter a valid LinkedIn profile link')
    .required('Please enter a valid LinkedIn profile link'),
});

const validationSchemaTechnical = Yup.object({
  past_experience: Yup.string()
    .max(50000, 'Must be 50 characters or less')
    .required('Past experience is required'),
  work_links: Yup.string()
    .matches(linkRegex, 'Please enter a valid link')
    .required('Please enter a valid link'),
  linkedin: Yup.string()
    .matches(linkedinProfileRegex, 'Please enter a valid LinkedIn profile link')
    .required('Please enter a valid LinkedIn profile link'),
});

import {
  setTechnicalFreelancerFormData,
  setNonTechnicalFreelancerFormData,
} from '~/features/freelancer/freelancerSlice';
export default function Experience({ nextStepHandler, prevStepHandler, role }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let freelancerData = {};
  if (role === 'Technical') {
    freelancerData = useSelector(
      (state) => state.freelancer.technicalFreelancerFormData
    );
  } else if (role === 'Non Technical') {
    freelancerData = useSelector(
      (state) => state.freelancer.nonTechnicalFreelancerFormData
    );
  }

  useEffect(() => {
    if (role === 'Technical') {
      if (freelancerData?.past_experience?.length < 0) {
        toast.error('Please fill previous form first');
        navigate(-1);
        return;
      } else if (freelancerData?.work_links?.length < 0) {
        toast.error('Please fill previous form first');
        navigate(-1);
        return;
      } else if (freelancerData?.subject_tags?.length < 0) {
        toast.error('Please fill previous form first');
        navigate(-1);
        return;
      } else if (freelancerData?.assignment_type?.length < 0) {
        toast.error('Please fill previous form first');
        navigate(-1);
        return;
      } else if (freelancerData?.past_work_files?.length < 0) {
        toast.error('Please fill previous form first');
        navigate(-1);
        return;
      }
    } else if (role === 'Non Technical') {
      if (freelancerData?.past_experience?.length < 0) {
        toast.error('Please fill previous form first');
        navigate(-1);
        return;
      } else if (freelancerData?.work_links?.length < 0) {
        toast.error('Please fill previous form first');
        navigate(-1);
        return;
      } else if (freelancerData?.subject_tags?.length < 0) {
        toast.error('Please fill previous form first');
        navigate(-1);
        return;
      } else if (freelancerData?.assignment_type?.length < 0) {
        toast.error('Please fill previous form first');
        navigate(-1);
        return;
      } else if (freelancerData?.past_work_files?.length < 0) {
        toast.error('Please fill previous form first');
        navigate(-1);
        return;
      }
    }
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      typing_speed: freelancerData.typing_speed || '',
      past_experience: freelancerData.past_experience || '',
      work_links: freelancerData.work_links || '',
      experience: freelancerData.experience || '',
      linkedin: freelancerData.linkedin || '',
    },

    validationSchema:
      role === 'Technical'
        ? validationSchemaTechnical
        : validationSchemaNonTech,
    onSubmit: (values) => {
      if (role === 'Technical') {
        if (values?.past_experience?.length < 0) {
          toast.error('Please enter your past experience');
          return;
        }
        if (values?.work_links?.length < 0) {
          toast.error('Please enter your work links');
          return;
        }
        if (values?.linkedin?.length < 0) {
          toast.error('Please enter your linkedin profile link');
          return;
        }
      } else if (role === 'Non Technical') {
        if (values?.typing_speed?.length < 0) {
          toast.error('Please enter your typing speed');
          return;
        }
        if (values?.past_experience?.length < 0) {
          toast.error('Please enter your past experience');
          return;
        }
        if (values?.work_links?.length < 0) {
          toast.error('Please enter your work links');
          return;
        }
        if (values?.linkedin?.length < 0) {
          toast.error('Please enter your linkedin profile link');
          return;
        }
      }
      nextStepHandler();
    },
  });

  const handleFormBlur = (fieldName) => {
    if (formik.errors[fieldName]) {
      toast.error(formik.errors[fieldName]);
      return;
    }
    formik.setFieldValue(fieldName, formik.values[fieldName]);
    if (role === 'Technical') {
      dispatch(
        setTechnicalFreelancerFormData({
          ...freelancerData,
          [fieldName]: formik.values[fieldName],
        })
      );
    } else if (role === 'Non Technical') {
      dispatch(
        setNonTechnicalFreelancerFormData({
          ...freelancerData,
          [fieldName]: formik.values[fieldName],
        })
      );
    }
  };

  return (
    <>
      <label className="block mt-4 mb-2 text-xl font-medium ">
        Experience Section
      </label>
      <div className="flex flex-col md:w-[50rem] w-[20rem] ">
        <div className="relative flex flex-row flex-shrink-0 gap-4 pt-10">
          <FormControl
            variant="outlined"
            required
            sx={{
              marginTop: '1rem',
              width: '100%',
            }}
          >
            <InputLabel htmlFor="outlined-adornment-name">
              Past Experience
            </InputLabel>
            <OutlinedInput
              sx={{
                borderRadius: '25px',
              }}
              value={formik.values.past_experience}
              onChange={formik.handleChange('past_experience')}
              onBlur={() => handleFormBlur('past_experience')}
              error={
                formik.touched.past_experience &&
                Boolean(formik.errors.past_experience)
              }
              type="text"
              id="past_experience"
              name="past_experience"
              label="Past Experience"
              placeholder="Past Experience (e.g. 2 years of experience in teaching)"
            />
          </FormControl>
          {role === 'Non Technical' ? (
            <FormControl
              fullWidth
              sx={{
                marginTop: '1rem',
              }}
              error={
                formik.touched.typing_speed &&
                Boolean(formik.errors.typing_speed)
                  ? true
                  : false
              }
            >
              <InputLabel id="demo-simple-select-label">
                Typing Speed
              </InputLabel>
              <Select
                sx={{
                  borderRadius: '25px',
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.typing_speed}
                label="Typing Speed"
                onChange={formik.handleChange('typing_speed')}
                onBlur={() => handleFormBlur('typing_speed')}
              >
                <MenuItem value={'1000-2000'}>1000-2000 words</MenuItem>
                <MenuItem value={'2000-5000'}>2000-5000 words</MenuItem>
                <MenuItem value={'>5000'}>more than 5000 words</MenuItem>
              </Select>
            </FormControl>
          ) : null}
        </div>

        <div className="flex flex-row flex-shrink-0 gap-4 pt-10 srelative">
          <FormControl
            variant="outlined"
            required
            sx={{
              width: '100%',
            }}
          >
            <InputLabel htmlFor="outlined-adornment-name">
              Work Links
            </InputLabel>
            <OutlinedInput
              sx={{
                borderRadius: '25px',
              }}
              value={formik.values.work_links}
              onChange={formik.handleChange('work_links')}
              onBlur={() => handleFormBlur('work_links')}
              error={
                formik.touched.work_links && Boolean(formik.errors.work_links)
              }
              type="url"
              id="work_links"
              name="work_links"
              label="Work Links"
              placeholder="Work links (e.g. LinkedIn, Github, etc.)"
            />
          </FormControl>
          <FormControl
            variant="outlined"
            required
            sx={{
              width: '100%',
            }}
          >
            <InputLabel htmlFor="outlined-adornment-name">
              LinkedIn Profile Link
            </InputLabel>
            <OutlinedInput
              sx={{
                borderRadius: '25px',
              }}
              type="url"
              value={formik.values.linkedin}
              onChange={formik.handleChange('linkedin')}
              onBlur={() => handleFormBlur('linkedin')}
              error={formik.touched.linkedin && Boolean(formik.errors.linkedin)}
              id="linkedin"
              name="linkedin"
              label="LinkedIn Profile Link"
              placeholder="LinkedIn Profile Link"
            />
          </FormControl>
        </div>

        <FormControl
          variant="outlined"
          sx={{
            marginTop: '2rem',
            width: '100%',
          }}
        >
          <InputLabel htmlFor="outlined-adornment-name">
            Freelancing Experience
          </InputLabel>
          <OutlinedInput
            sx={{
              borderRadius: '25px',
            }}
            value={formik.values.experience}
            onChange={formik.handleChange('experience')}
            onBlur={() => handleFormBlur('experience')}
            error={
              formik.touched.experience && Boolean(formik.errors.experience)
            }
            multiline
            type="text"
            rows={5}
            cols={33}
            id="experience"
            name="experience"
            label="Freelancing Experience"
            placeholder="Freelancing Experience in Academics (e.g. 2 years of experience in teaching) (optional)"
          />
        </FormControl>
      </div>
      <div className="flex flex-row gap-4 mt-16">
        <button
          onClick={() => {
            prevStepHandler();
          }}
          className="flex flex-row items-center justify-center w-32 py-1 mt-5 mb-10 text-lg rounded-full right-10 md:font-SemiBold md:text-xl text-blue141 md:py-3 md:w-48"
        >
          <span className="items-center  flex ">
            <LucideChevronLeft className="w-5 h-5 " />
            <span className="ml-1 md:ml-2 mb-1">Prev</span>
          </span>
        </button>
        <button
          disabled={
            formik.errors.past_experience ||
            formik.errors.work_links ||
            formik.errors.linkedin ||
            formik.errors.typing_speed
              ? true
              : false
          }
          type="submit"
          onClick={formik.handleSubmit}
          className="flex flex-row items-center justify-center w-32 py-1 mt-5 mb-10 text-lg rounded-full right-10 md:font-SemiBold md:text-xl text-blue141 md:py-3 md:w-48 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="items-center px-2 flex ">
            <span className="mr-1 md:mr-2 mb-1">Next</span>
            <LucideChevronRight className="w-5 h-5 " />
          </span>
        </button>
      </div>
    </>
  );
}
