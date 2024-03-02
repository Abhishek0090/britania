import React from "react";
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import Steps from "~/components/Steps";

const BHPage = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Helmet>
        <title>BH Projects by Bluepen</title>
      </Helmet>
      <div className="heroWrapper">
        <div className="md:mt-[8rem] mt-[5rem] w-full font-league md:pb-[5rem]">
          <section className="max-w-[1920px] mx-auto flex flex-col  md:flex-row xl:flex-row md:justify-between md:items-center  md:pl-[5rem] md:pr-[5rem] md:py-10 pt-5 mt-2 gap-5">
            <div className="flex flex-col px-10 md:py-4 items-center justify-center  gap-5 md:gap-8 md:items-center md:justify-start w-auto md:w-[100%]">
              <h1 className="hidden md:block text-black md:text-[3.6rem] text-[2.2rem]  md:pt-3 md:pb-1 leading-none tracking-wider md:tracking-wider text-left text-center">
                <span className="flex items-center justify-center gap-8 font-bold text-[5rem]">
                  <span class="heading-line">
                    <span class="">Brainheaters</span>
                  </span>
                  <span class="heading-line">
                    <span class="">Projects</span>
                  </span>
                  <span class="">
                    <span class=" ">By</span>
                  </span>
                  <span class="">
                    <span class="linear-swipe">Bluepen</span>
                  </span>
                </span>
                <p className="text-[2rem] mt-5 text-gray-800 w-[100%]">
                  We help you get your final year engineering projects done.
                </p>{" "}
              </h1>
              <h1 className=" block md:hidden text-black md:text-[3.5rem] text-[3rem] font-SemiBold md:pt-3 md:pb-1 leading-none tracking-wider md:tracking-normal text-center">
                <span className="flex flex-col items-center justify-center gap-6 font-bold text-[3rem] ">
                  <span class="heading-line flex flex-col gap-3">
                    <span class="">Brainheaters</span>
                    <span></span>
                    <span class=" ">Projects</span>
                  </span>
                  <span class=" flex gap-3">
                    <span class="">By</span>

                    <span class="linear-swipe ">Bluepen</span>
                  </span>
                </span>
                <br />
                <p className="text-[1.8rem] text-gray-800">
                  We help you get your final year engineering projects done.
                </p>{" "}
              </h1>
              {/* <p className="text-black md:text-[1.6rem] text-[1.5rem] max-w-2xl md:py-5  leading-none md:mt-0 mt-5  md:tracking-normal tracking-wide text-center md:text-left italic">
            </p> */}
              <div className="flex lg:flex-row md:flex-row flex-col md:flex gap-0 lg:gap-5 md:gap-5">
                <button
                  onClick={() => navigate("/brainheaters/form")}
                  className="bg-[#2956A8]  text-[#ffff] font-semibold md:font-bold py-2 px-5 rounded-xl md:py-3 md:px-3 text-[1.2rem] md:text-[1.5rem] md:rounded-xl md:mt-1 md:my-0 my-5 hover:transform hover:scale-105 hover:border-2 hover:border-[#2956A8] hover:bg-[#ffff] hover:text-[#2956A8] transition duration-300 ease-in-out  hover:shadow-xl"
                >
                  Post Your Requirement
                </button>
                {/* <a
                href="#works"
                className="bg-[#ffff]  text-[#2956A8] text-center font-semibold md:font-bold py-2 px-5 rounded-xl w-[200px] md:py-3 md:px-3 text-[1.2rem] md:text-[1.5rem] md:rounded-full md:mt-1 md:my-0 my-5 hover:transform hover:scale-105 border-2 border-[#2956A8] hover:bg-[#2956A8] hover:text-[#ffff] transition duration-300 ease-in-out"
              >
                Read More
              </a> */}
              </div>
            </div>
          </section>

          <Suspense fallback={<></>}>
            <div id="works">
              <Steps />
            </div>
          </Suspense>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BHPage;
