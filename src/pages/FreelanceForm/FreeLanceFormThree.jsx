import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LucideArrowRightCircle } from 'lucide-react';
import { Icon } from '@mui/material';
import { NonTechnicalRoles } from '~/pages/FreelanceForm/FreelancerData/NonTechnicalRoles';
import { TechnicalRoles } from '~/pages/FreelanceForm/FreelancerData/TechnicalRoles';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {
  setTechnicalFreelancerFormData,
  setNonTechnicalFreelancerFormData,
} from '~/features/freelancer/freelancerSlice';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function FreelanceFormThree() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState('none');
  const [selectedRoles, setSelectedRoles] = useState([]);

  const selectRolesHandler = () => {
    if (localStorage.getItem('form')) {
      let form = JSON.parse(localStorage.getItem('form'));
      form.forEach((item, index) => {
        if (Object.keys(item)[0] === 'Step2') {
          setSelectedRoles(Object.values(item)[0].split(','));
        }
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem('form')) {
      let form = JSON.parse(localStorage.getItem('form'));
      form.forEach((item, index) => {
        if (Object.keys(item)[0] === 'Step1') {
          // setSelectedRoles(Object.values(item)[1].split(','));
          if (Object.values(item)[0].split(',')[0] === 'Technical') {
            setRole('Technical');
            dispatch(
              setTechnicalFreelancerFormData({
                role: 'Technical',
              })
            );
          } else if (Object.values(item)[0].split(',')[0] === 'Non Technical') {
            setRole('Non Technical');
            dispatch(
              setNonTechnicalFreelancerFormData({
                role: 'Non Technical',
              })
            );
          }
        }
      });
    } else {
      window.alert('Please fill the form from the beginning');
      navigate('/freelance/step2');
    }
    if (localStorage.getItem('form')) {
      let form = JSON.parse(localStorage.getItem('form'));
      form.forEach((item, index) => {
        if (Object.keys(item)[0] === 'Step2') {
          setSelectedRoles(Object.values(item)[0].split(','));
        }
      });
    }
  }, []);

  const formHandler = (e) => {
    if (localStorage.getItem('form')) {
      let form = JSON.parse(localStorage.getItem('form'));
      let isPresent = false;
      form.forEach((item, index) => {
        if (Object.keys(item)[0] === Object.keys(e)[0]) {
          let values = Object.values(item)[0].split(',');
          if (values.includes(Object.values(e)[0])) {
            values = values.filter((value) => value !== Object.values(e)[0]);
          } else {
            values.push(Object.values(e)[0]);
          }
          if (values.length === 0) {
            form.splice(index, 1);
          } else {
            form[index][Object.keys(e)[0]] = values.join(',');
          }
          isPresent = true;
        }
      });
      if (!isPresent) {
        form.push(e);
      }
      localStorage.setItem('form', JSON.stringify(form));
    }
  };

  const nextHandler = () => {
    if (selectedRoles?.length === 0) {
      toast.error('Please select atleast one role');
      return;
    }
    let formData = JSON.parse(localStorage.getItem('form'));
    // convert to object
    formData = Object.assign({}, ...formData);
    console.log(formData.Step1);
    if (formData.Step1 === 'Technical') {
      navigate('/freelance/freelancer/technical/step1');
    } else if (formData.Step1 === 'Non Technical') {
      navigate('/freelance/freelancer/nontechnical/step1');
    } else navigate('/freelance/step2');
  };

  return (
    <>
      {/* // heading  */}
      <div className="flex flex-col items-center justify-center pb-10 md:pb-8 md:pt-1 mt-5">
        <h1 className="text-2xl font-bold text-gray-800 md:text-5xl">
          Select your specification
        </h1>
        <p className="text-gray-500 text-sm md:text-xl font-medium text-center max-w-[20rem] pt-2 md:max-w-xl mx-auto">
          Select the specification you are best at, you can select multiple
          options if you are good at multiple things.
        </p>
      </div>

      {role === 'Technical' ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="md:gap-x-10 md:gap-y-8 md:grid  md:grid-cols-4 md:max-w-[85rem]  max-w-[110rem] mx-auto flex flex-col  md:px-0 justify-between items-center"
        >
          {Array(TechnicalRoles?.length)
            .fill()
            .map((_, index) => (
              <motion.button
                key={index}
                variants={item}
                onClick={() => {
                  formHandler({
                    Step2: TechnicalRoles[index]?.name,
                  });
                  selectRolesHandler();
                }}
                className={
                  'mb-5 md:mb-0 backdrop-blur-2xl  drop-shadow shadow-2xl rounded-xl items-center flex-col  px-4  border border-gray-200  w-80 hover:bg-blue111 hover:text-white md:h-[27rem] ' +
                  (selectedRoles.includes(TechnicalRoles[index]?.name)
                    ? ' bg-blue111 text-white'
                    : '')
                }
              >
                <img
                  className="hidden object-fill h-52 p-2 rounded-t-lg md:block"
                  src={TechnicalRoles[index]?.img}
                  alt={TechnicalRoles[index]?.name}
                />
                <div className="hidden p-5 md:block">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-left text-gray-900 ">
                    {TechnicalRoles[index]?.name}
                  </h5>
                  <p className="mb-3 font-normal text-left">
                    {TechnicalRoles[index]?.description}
                  </p>
                </div>
                <div className="flex items-center justify-between p-2 md:p-5 md:hidden">
                  {/* // icon */}
                  <span className="absolute flex items-center justify-center w-8 h-10 mr-5 rounded-full  md:hidden left-2">
                    <Icon>{TechnicalRoles[index]?.icon}</Icon>
                  </span>

                  <h5 className="mb-2 text-lg font-bold text-center text-gray-900 md:text-2xl ">
                    {TechnicalRoles[index]?.name}
                  </h5>
                  <p className="hidden mb-3 font-normal md:block">
                    {TechnicalRoles[index]?.description}
                  </p>
                </div>
              </motion.button>
            ))}
        </motion.div>
      ) : (
        <>
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="md:gap-x-10 md:gap-y-8 md:grid  md:grid-cols-4 md:max-w-[85rem]  max-w-[110rem] mx-auto flex flex-col  md:px-0 justify-between items-center"
          >
            {Array(NonTechnicalRoles?.length)
              .fill()
              .map((_, index) => (
                <motion.button
                  key={index}
                  variants={item}
                  onClick={() => {
                    formHandler({
                      Step2: NonTechnicalRoles[index]?.name,
                    });
                    selectRolesHandler();
                  }}
                  className={
                    'mb-5 md:mb-0 backdrop-blur-2xl  drop-shadow shadow-2xl rounded-xl items-center flex-col  px-4  border border-gray-200  w-80 hover:bg-blue111 hover:text-white md:h-[27rem] ' +
                    (selectedRoles.includes(NonTechnicalRoles[index]?.name)
                      ? ' bg-blue111 text-white'
                      : '')
                  }
                >
                  <img
                    className="hidden object-fill h-52 p-2 rounded-t-lg md:block"
                    src={NonTechnicalRoles[index]?.img}
                    alt={NonTechnicalRoles[index]?.name}
                  />
                  <div className="hidden p-5 md:block">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-left text-gray-900 ">
                      {NonTechnicalRoles[index]?.name}
                    </h5>
                    <p className="mb-3 font-normal text-left">
                      {NonTechnicalRoles[index]?.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-2 md:p-5 md:hidden">
                    {/* // icon */}
                    <div className="absolute flex items-center justify-center w-6 h-6 mr-5 rounded-full  md:hidden left-2">
                      <Icon>{NonTechnicalRoles[index]?.icon}</Icon>
                    </div>

                    <h5 className="mb-2 text-lg font-bold text-center text-gray-900 md:text-2xl ">
                      {NonTechnicalRoles[index]?.name}
                    </h5>
                    <p className="hidden mb-3 font-normal md:block">
                      {NonTechnicalRoles[index]?.description}
                    </p>
                  </div>
                </motion.button>
              ))}
          </motion.div>
        </>
      )}
      <div className="flex items-center justify-center pt-10">
        <button
          onClick={() => {
            nextHandler();
          }}
          className="flex flex-row items-center justify-center w-40 py-2 mt-5 mb-10 text-lg font-medium text-white rounded-full bg-blue141 md:font-SemiBold md:text-xl md:py-3 md:w-48"
        >
          <span className="ml-2 mr-1 md:mr-2">Confirm</span>
          <motion.span className="items-center px-2 ">
            <LucideArrowRightCircle className="w-5 h-5 ml-2" />
          </motion.span>
        </button>
      </div>
    </>
  );
}
