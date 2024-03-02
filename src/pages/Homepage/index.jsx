import React, { Suspense, lazy } from "react";
import ServicesScroll from "~/components/ServicesScroll";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
// import Flags from "~/components/Flags";
// import Services from "~/pages/Services";
const Features = lazy(() => import("~/components/Features"));
const Services = lazy(() => import("~/pages/Services"));
const Flags = lazy(() => import("~/components/Flags"));
const Steps = lazy(() => import("~/pages/Steps"));
const Testimonials = lazy(() => import("~/pages/Testimonials"));
const FAQ = lazy(() => import("~/components/FAQ"));
const Marketing = lazy(() => import("~/utils/Marketing"));
import { selectAuth } from "~/features/auth/authslice";

export default function HomePage() {
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);

  console.log(auth);

  return (
    <>
      <Helmet>
        <title> Home | Bluepen</title>
      </Helmet>
      <Suspense fallback={<></>}>
        <Marketing pageName="HomePage" />
      </Suspense>
      {window.innerWidth < 1024 && (
        <ServicesScroll customStyles={"backdrop-blur-lg bg-white"} />
      )}
      <div className="heroWrapper">
        <div className="md:mt-0 mt-5 w-full font-league md:pb-[5rem]">
          <section className="max-w-[1920px] mx-auto flex flex-col  md:flex-row xl:flex-row md:justify-between  md:pl-[3rem] md:pr-[3rem] md:py-10 pt-5 mt-2 gap-5">
            <div className="flex flex-col px-10 md:py-4 items-center justify-center  gap-5 md:gap-0 md:items-start md:justify-start w-auto md:w-[45%]">
              <h1 className="hidden md:block text-black md:text-[3.6rem] text-[2.2rem] font-bold md:pt-3 md:pb-1 leading-none tracking-wider md:tracking-normal text-left">
                We help you do your <br />{" "}
                <b className="text-[#E58833]">Assignments</b>
              </h1>
              <h1 className=" block md:hidden text-black md:text-[3.5rem] text-[3rem] font-SemiBold md:pt-3 md:pb-1 leading-none tracking-wider md:tracking-normal text-center">
                We help you do your assignments.
              </h1>
              <p className="text-black md:text-[1.6rem] text-[1.5rem] max-w-2xl md:py-10  leading-none md:mt-0 mt-5  md:tracking-normal tracking-wide text-center md:text-left">
                Never worry about not knowing your assignments. Find experts to
                help you with your assignments and projects.
              </p>
              <div className="flex lg:flex-row md:flex-row flex-col md:flex gap-0 lg:gap-5 md:gap-5">
                <button
                  onClick={() => navigate("/submit")}
                  className="bg-[#2956A8]  text-[#ffff] font-semibold md:font-bold py-2 px-5 rounded-full w-[280px] md:py-3 md:px-3 text-[1.2rem] md:text-[1.5rem] md:rounded-lg md:mt-1 md:my-0 my-5 hover:transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Post your Assignment
                </button>
                {(!auth?.id || auth?.role === null) && (
                  <button
                    onClick={() => {
                      if (auth?.id && auth?.role === null) {
                        navigate("/submit/plagiarism-check");
                      } else {
                        navigate("/submit/checkplagiarism");
                      }
                    }}
                    className="bg-[#e58833] text-[#FFFF] text-black font-semibold md:font-bold py-2 px-5 rounded-full w-[300px] md:py-3 md:px-3 text-[1.2rem] md:text-[1.5rem] md:rounded-lg md:mt-1 md:my-0 my-5 hover:transform hover:scale-105 transition duration-300 ease-in-out"
                  >
                    Quick Plagiarism Check
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-col gap-10 w-auto md:w-[55%]">
              <ul className="md:px-10 py-4 items-center justify-center md:items-start md:justify-start flex flex-col  md:flex-row xl:flex-row gap-8 md:pt-10 hidden md:flex">
                <li className="flex flex-col gap-0 md:flex-col xl:flex-col md:justify-center items-center bg-white text-black rounded-lg h-50 md:h-72 py-2 md:px-2 px-20 md:w-52  hover:transform hover:scale-105 transition duration-300 ease-in-out">
                  <h1 className="text-[1.8rem] md:text-[1.5rem] font-semibold text-center">
                    Trusted by
                  </h1>
                  <h2 className="md:text-[3.5rem] text-[2.5rem] font-Bold text-center text-[#2956A8] ">
                    {/* <CountUp end={3000} /> */}
                    3000
                  </h2>
                  <p className="text-[3.5rem] font-semibold text-center">+</p>
                  <p className="text-[1.8rem] md:text-[1.5rem] font-semibold text-center">
                    Students
                  </p>
                </li>
                <li className="flex flex-col md:flex-col xl:flex-col md:justify-center items-center bg-white text-black  rounded-lg  md:h-72 py-2 md:px-2 px-20 md:w-52 hover:transform hover:scale-105 transition duration-300 ease-in-out">
                  <h1 className="text-[1.8rem] md:text-[1.5rem]  font-semibold text-center">
                    More than
                  </h1>
                  <h2 className="md:text-[3.5rem] text-[2.5rem] font-Bold text-center text-[#E58833] ">
                    {/* <CountUp end={400} /> */}
                    400
                  </h2>
                  <h3 className="text-[1.8rem] md:text-[1.5rem] font-semibold text-center">
                    Genuine <br />
                    experts
                  </h3>
                  <h4 className="text-[1.8rem] md:text-[1.5rem] font-semibold text-center">
                    &
                  </h4>
                  <p className="text-[1.8rem] md:text-[1.5rem] font-semibold text-center">
                    writers
                  </p>
                </li>

                <li className="flex flex-col md:flex-col xl:flex-col md:justify-center items-center bg-white text-black rounded-lg   md:h-72 py-2 md:px-2 px-20 md:w-52 hover:transform hover:scale-105 transition duration-300 ease-in-out">
                  <h1 className="text-[1.8rem] md:text-[1.5rem]  font-semibold text-center">
                    More than
                  </h1>
                  <h2 className="md:text-[3.5rem] text-[2.5rem] font-Bold text-center text-[#2956A8]">
                    {/* <CountUp end={1000} /> */}
                    1000
                  </h2>
                  <h3 className="text-[1.8rem] md:text-[1.5rem] font-semibold text-center">
                    Domains
                  </h3>
                  <h4 className="text-[1.8rem] md:text-[1.5rem] font-semibold text-center">
                    &
                  </h4>
                  <p className="text-[1.8rem] md:text-[1.5rem] font-semibold text-center">
                    subjects <br /> covered
                  </p>
                </li>
              </ul>
              {/* <Suspense fallback={<></>}> */}
              <div className="p-12 md:hidden ">
                <Features />
              </div>
              {/* </Suspense> */}
              {/* <Suspense fallback={<></>}> */}
              <Flags />
              {/* </Suspense> */}
            </div>
          </section>
        </div>
      </div>

      <Suspense fallback={<></>}>
        <Services />
        <Steps />
        <Testimonials />
        <FAQ />
      </Suspense>
    </>
  );
}
