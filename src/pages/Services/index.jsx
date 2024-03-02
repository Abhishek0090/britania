import React, { useState } from 'react';
import thesisImg from '~/assets/services/thesis.png';
import researchImg from '~/assets/services/research.png';
import sopImg from '~/assets/services/sop.png';
import codingImg from '~/assets/services/coding.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const ServicesDesc = [
  {
    title: 'Dissertations & Thesis',
    description:
      'Get expert help with your dissertation or thesis and take the first step towards achieving your academic goals.',
    deg: -155,
  },
  {
    title: 'SOP & LOR',
    description:
      'Craft a compelling statement of purpose or secure a strong letter of recommendation with our professional writing services.',
    deg: -100,
  },
  {
    title: 'Coding Assignments',
    description:
      'Get top-notch solutions for your coding assignments from experienced programmers and take your skills to the next level.',
    deg: 90,
  },
  {
    title: 'Research Paper',
    description:
      'Get comprehensive research paper writing services from expert writers and ensure a top-quality submission.',
    deg: 140,
  },
];

export default function Services() {
  const navigate = useNavigate();
  const [rotate, setRotate] = useState(-155);
  const [button, setButton] = useState(ServicesDesc[0]);
  const handleRotate = (deg) => {
    setRotate(deg);
    setButton(ServicesDesc.find((item) => item.deg === deg));
  };

  return (
    <div className="grid w-full  grid-cols-1 gap-5  p-5 font-league lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2">
      {/* Button Description */}
      <div className="md:ml-10 flex flex-col w-full px-10 py-10 shadow-2xl backdrop-blur-3xl rounded-3xl h-fit">
        {' '}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            key={button.title}
            className="flex flex-col  text-justify md:block md:py-0"
          >
            <h1 className=" md:text-[3rem] tracking-tighter text-[2rem] font-bold py-2 uppercase ">
              {button.title}
            </h1>
            <h1 className="text-lg  md:text-[1.5rem]    tracking-normal  text-left">
              {button.description}
            </h1>
            <motion.button
              onClick={() => navigate('/about')}
              className="w-32 py-1 mt-5 text-lg text-white rounded-full bg-blue141 font-Regular md:text-xl md:py-3 md:w-64"
            >
              Learn More
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="text-2xl button-container font-league">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="16.6 44.02 157.75 121.75"
          className="absolute -z-10 py-8  w-[20rem] md:w-[32rem] xl:w-[32rem] "
        >
          <path
            fill="#231F20"
            d="M52.8,-47.3C66.7,-38.9,75.1,-19.4,74.3,-0.8C73.5,17.9,63.6,35.8,49.7,48.3C35.8,60.8,17.9,67.9,2.7,65.2C-12.6,62.6,-25.1,50.1,-41.5,37.6C-57.9,25.1,-78.2,12.6,-82.5,-4.3C-86.8,-21.2,-75.2,-42.4,-58.8,-50.8C-42.4,-59.3,-21.2,-55,-0.9,-54.1C19.4,-53.2,38.9,-55.8,52.8,-47.3Z"
            transform="translate(100 100)"
          ></path>
        </svg>
        <motion.img
          animate={{
            rotate: rotate,
          }}
          transition={{
            duration: 0.5,
            ease: 'backInOut',
          }}
          src="https://img.icons8.com/3d-fluency/94/null/ball-point-pen.png"
          alt="logo"
          id="pen"
        />
        <ul>
          <li>
            <button onClick={() => handleRotate(-155)}>
              <img src={thesisImg} />
            </button>
          </li>
          <li>
            <button onClick={() => handleRotate(-100)}>
              <img src={sopImg} />
            </button>
          </li>
          <li>
            <button onClick={() => handleRotate(90)}>
              <img src={codingImg} />
            </button>
          </li>
          <li>
            <button onClick={() => handleRotate(140)}>
              <img src={researchImg} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
