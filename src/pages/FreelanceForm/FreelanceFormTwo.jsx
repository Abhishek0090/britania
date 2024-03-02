import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TechnicalImg from "~/assets/tech/technical.png";
import NonTechnicalImg from "~/assets/nontech/nontech.png";

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

const freelancerRoles = [
  {
    id: 1,
    name: "Technical",
    img: TechnicalImg,
    desc: "If you are an engineer or your expertise is related to engineering, select this card to proceed to become a technical freelancer",
  },
  {
    id: 2,
    name: "Non Technical",
    img: NonTechnicalImg,
    desc: "Mba, finance, commerce, arts, law, psychology or such terms relate to your daily field of work, non technical is the correct card to choose for you and apply for freelancing",
  },
];
export default function FreelanceFormTwo() {
  const navigate = useNavigate();
  const [role, setRole] = useState("none");
  const [selectedRoles, setSelectedRoles] = useState([]);

  const selectRolesHandler = () => {
    if (localStorage.getItem("form")) {
      let form = JSON.parse(localStorage.getItem("form"));
      form.forEach((item, index) => {
        if (Object.keys(item)[0] === "Step1") {
          setSelectedRoles(Object.values(item)[0].split(","));
          // console.log(Object.values(item)[0].split(','));
        }
      });
    }
  };

  const formHandler = (e) => {
    if (localStorage.getItem("form")) {
      let form = JSON.parse(localStorage.getItem("form"));
      let isPresent = false;
      if (Object.keys(e)[0] === "Step1") {
        form.forEach((item, index) => {
          if (Object.keys(item)[0] === Object.keys(e)[0]) {
            form[index][Object.keys(e)[0]] = Object.values(e)[0];
            isPresent = true;
          }
        });
      } else {
        form.forEach((item, index) => {
          if (Object.keys(item)[0] === Object.keys(e)[0]) {
            form[index][Object.keys(e)[0]] = Object.values(e)[0];
            isPresent = true;
          }
        });
      }

      if (!isPresent) {
        form.push(e);
      }

      if (Object.keys(e)[0] === "Step1") {
        let values = Object.values(e)[0].split(",");
        let isFreelancer = false;
        values.forEach((value) => {
          if (freelancerRoles.map((role) => role.name).includes(value)) {
            isFreelancer = true;
          }
        });
        if (isFreelancer) {
          navigate("/freelance/step3");
        }
      }

      localStorage.setItem("form", JSON.stringify(form));
    }
  };

  useEffect(() => {
    localStorage.setItem("form", JSON.stringify([]));
  }, []);

  return (
    <>
      {/* // heading  */}
      <div className="flex flex-col items-center justify-center pt-2 pb-5 mt-2">
        <h1 className="text-2xl font-bold text-gray-800 md:text-5xl">
          Select your category
        </h1>
        <p className="text-gray-500 text-sm md:text-xl font-medium text-center max-w-[20rem] pt-2 md:max-w-xl mx-auto">
          Select your category of freelancing from the two given below
        </p>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className=" md:max-w-[45rem] md:my-10 max-w-[110rem] mx-auto flex md:flex-row flex-col  md:px-0 justify-between items-center"
      >
        {Array(freelancerRoles.length)
          .fill()
          .map((_, index) => (
            <motion.button
              key={index}
              variants={item}
              onClick={() => {
                formHandler({
                  Step1: freelancerRoles[index].name,
                });
                selectRolesHandler();
              }}
              className={
                "mb-5 md:mb-0 backdrop-blur-2xl   shadow-2xl rounded-xl items-center flex-col  px-4  border border-gray-200  w-80 hover:bg-blue111 hover:text-white md:h-[30rem] " +
                (selectedRoles.includes(freelancerRoles[index].name)
                  ? " bg-blue111 text-white"
                  : "")
              }
            >
              <img
                className="hidden object-fill h-64 p-2 rounded-t-lg md:block"
                src={freelancerRoles[index]?.img}
                alt={freelancerRoles[index]?.name}
              />
              <div className=" p-5 md:block">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-left text-gray-900 ">
                  {freelancerRoles[index]?.name}
                </h5>
                <p className="mb-3 font-normal text-left">
                  {freelancerRoles[index]?.desc}
                </p>
              </div>
            </motion.button>
          ))}
      </motion.div>
    </>
  );
}
