import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import programmingImg from "~/assets/assignments/programming.png";
import academicImg from "~/assets/assignments/academic.png";
import professionalImg from "~/assets/assignments/professional.png";
import plagiarismImg from "~/assets/assignments/plagiarism.png";
import { Programming, Professional, Academic, Plagiarism } from "./DomainData";
import DomainMarque from "~/utils/DomainMarque";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import toast from "react-hot-toast";

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
const technicalRoles = [
  {
    id: 1,
    name: "Academic Writing",
    link: "/submit/academicwriting",
    data: Academic,
    img: academicImg,
    description:
      "Our expert freelancers are well-versed in various academic disciplines, providing custom solutions for essays, research papers, case studies, and more. Whether you need help with scientific writing or literature review, our team is here to assist you.",
  },
  {
    id: 2,
    name: "Programming",
    link: "/submit/programmingassignment",

    data: Programming,
    img: programmingImg,
    description:
      "From debugging to optimization, our freelancers can help you grasp complex programming concepts and deliver efficient and well-structured code. Take advantage of our programming expertise and boost your assignments.",
  },
  {
    id: 3,
    name: "Professional Writing",
    link: "/submit/professionalwriting",
    data: Professional,
    img: professionalImg,
    description:
      "Our professional writers specialize in crafting effective statements of purpose, letters of recommendation, and other documents for your academic and career advancement. Whether you're applying for a university program or seeking job opportunities, our team can help you leave a lasting impression.",
  },
  // {
  //   id: 4,
  //   name: "Plagiarism Check",
  //   img: plagiarismImg,
  //   link: "/submit/plagiarism-check",
  //   data: Plagiarism,
  //   description:
  //     "We understand the importance of creativity and originality in arts assignments. That's why our freelancers work",
  // },
];

export default function AllOtherAssignment() {
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);

  const formHandler = (e, link) => {
    if (localStorage.getItem("Assignform")) {
      let form = JSON.parse(localStorage.getItem("Assignform"));
      let isPresent = false;
      form?.forEach((item, index) => {
        if (Object.keys(item)[0] === Object.keys(e)[0]) {
          form[index] = e;
          isPresent = true;
        }
      });

      if (!isPresent) {
        form?.push(e);
      }
      localStorage.setItem("Assignform", JSON.stringify(form));
    } else {
      let form = [];
      form?.push(e);
      localStorage.setItem("Assignform", JSON.stringify(form));
    }

    if (auth?.id && auth?.token && auth?.role === null) {
      navigate(link);
    } else {
      navigate("/auth/login");
      toast("Please Login First !", {
        icon: "😀",
      });
    }
  };

  return (
    <>
      {" "}
      <Helmet>
        <title>Select Assignment</title>
      </Helmet>
      <section className="mb-20 mt-2">
        <div className="flex flex-col items-center justify-center pb-5 md:py-5">
          <h1 className="md:pt-0 pt-1 text-2xl md:text-4xl font-bold text-gray-800">
            Choose your domain
          </h1>
          <p className="text-gray-500 text-sm md:text-lg font-medium text-center max-w-[20rem] pt-2 md:max-w-xl mx-auto">
            Choose your domain from the below given options and fill out the
            corresponding form for our team to look into your requirements
          </p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="pt-2 pb-5 gap-5   max-w-[90rem] mx-auto flex md:flex-row flex-col sm:flex md:flex-wrap lg:flex-nowrap px-5 md:px-0 justify-between items-center "
        >
          {Array(technicalRoles.length)
            .fill()
            .map((_, index) => (
              <motion.button
                key={index}
                variants={item}
                onClick={() => {
                  formHandler(
                    {
                      Step1: technicalRoles[index].name,
                    },
                    technicalRoles[index].link
                  );
                }}
                className={
                  "mb-5 md:mb-0  md:h-[33rem] md:w-[50rem] mx-auto     flex-col  px-5 shadow-2xl border border-gray-200 rounded-lg max-w-sm  hover:bg-blue111  lg:h-[36rem]  "
                }
              >
                <h5 className="text-gray-900 uppercase text-center font-bold text-2xl  mt-4 mb-2  ">
                  {technicalRoles[index].name}
                </h5>
                <img
                  className="rounded-t-lg h-[250px] p-2 object-cover hidden md:block "
                  src={technicalRoles[index].img}
                  alt={technicalRoles[index].name}
                />
                <div className="pt-2">
                  <h5 className="text-gray-900 text-justify font-bold text-xl  mb-2  ">
                    <DomainMarque
                      ContentList={technicalRoles[index].data}
                      color="text-gray-900"
                    />
                  </h5>

                  <p className="font-normal mb-3 text-left">
                    {technicalRoles[index].description}
                  </p>
                </div>
              </motion.button>
            ))}
        </motion.div>
      </section>
    </>
  );
}
