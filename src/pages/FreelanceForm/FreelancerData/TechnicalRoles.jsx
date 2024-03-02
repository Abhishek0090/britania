import mlImg from '~/assets/tech/ml.png';
import webDevImg from '~/assets/tech/web.png';
import appDevImg from '~/assets/tech/app.png';
import iotImg from '~/assets/tech/iot.png';
import blockchainImg from '~/assets/tech/blockchain.png';
import simulationImg from '~/assets/tech/simulation.png';
import othersImg from '~/assets/tech/others.png';
import programmingImg from '~/assets/tech/javapython.png';
import { LucideCode2 } from 'lucide-react';
export const TechnicalRoles = [
  {
    id: 1,
    name: 'Machine Learning & AI',
    img: mlImg,
    icon: (
      <img
        width="96"
        height="96"
        src="https://img.icons8.com/color/96/bot.png"
        alt="bot"
      />
    ),
    description:
      'Help our students solve complex problems using machine learning and AI techniques.',
  },
  {
    id: 2,
    name: 'Web Development',
    img: webDevImg,
    icon: (
      <img
        width="96"
        height="96"
        src="https://img.icons8.com/nolan/96/1A6DFF/C822FF/edged-faces-display-modes.png"
        alt="edged-faces-display-modes"
      />
    ),
    description:
      "Use your creativity to design and develop visually appealing websites for our student's assignments.",
  },
  {
    id: 3,
    name: 'App Development',
    img: appDevImg,
    icon: (
      <img
        width="96"
        height="96"
        src="https://img.icons8.com/color/96/android-studio--v2.png"
        alt="android-studio--v2"
      />
    ),
    description:
      "Build custom mobile applications for our student's assignments and help them achieve academic success.",
  },
  {
    id: 4,
    name: 'Java / Python / C++',
    img: programmingImg,
    icon: (
      <img
        width="96"
        height="96"
        src="https://img.icons8.com/color/96/code.png"
        alt="code"
      />
    ),
    description:
      'Help our students complete programming assignments and projects in various programming languages with your expertise.',
  },
  {
    id: 5,
    name: 'Blockchain & Cyber Security',
    img: blockchainImg,
    icon: (
      <img
        width="96"
        height="96"
        src="https://img.icons8.com/color/96/blockchain.png"
        alt="blockchain"
      />
    ),
    description:
      "Provide customized solutions for our student's assignments related to blockchain and cyber security domains.",
  },
  {
    id: 6,
    name: 'IOT & Embedded Systems',
    img: iotImg,
    icon: (
      <img
        width="96"
        height="96"
        src="https://img.icons8.com/color/96/arduino.png"
        alt="arduino"
      />
    ),
    description:
      "Use your knowledge of IOT and embedded systems to deliver high-quality solutions for our student's assignments and projects.",
  },
  {
    id: 7,
    name: 'Simulation & Modelling',
    img: simulationImg,
    icon: (
      <img
        width="96"
        height="96"
        src="https://img.icons8.com/color/96/virtual-reality.png"
        alt="virtual-reality"
      />
    ),
    description:
      ' Work on assignments related to simulation and modelling and help our students achieve academic success in this field.',
  },
  {
    id: 8,
    name: 'Others',
    img: othersImg,
    icon: (
      <img
        width="96"
        height="96"
        src="https://img.icons8.com/nolan/96/1A6DFF/C822FF/second-life.png"
        alt="second-life"
      />
    ),
    description:
      'Work on a variety of assignments from diverse academic domains and provide comprehensive support for our students.',
  },
];
