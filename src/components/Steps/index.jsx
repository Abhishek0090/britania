import {
  LucideArrowBigDown,
  LucideArrowBigLeft,
  LucideArrowBigRight,
  LucideArrowDown,
} from "lucide-react";
import React from "react";
import {
  FcApproval,
  FcReading,
  FcAssistant,
  FcComments,
  FcDocument,
} from "react-icons/fc";
import { useNavigate } from "react-router";

const Steps = () => {
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      icon: <FcReading size="80" />,
      title: "Step 1",
      description: "Fill the Form By Clicking Post Your Requirement",
      arrow: <LucideArrowBigRight color="black" />,
    },
    {
      id: 2,
      icon: <FcAssistant size="80" />,
      title: "Step 2",
      description: "Talk with us Regarding Project",
      arrow: <LucideArrowBigRight color="black" />,
    },
    {
      id: 3,
      icon: <FcApproval size="80" />,
      title: "Step 3",
      description: "Project Completed Successfully",
      arrow: <LucideArrowBigRight color="black" />,
    },
  ];

  return (
    <div
      className="w-full   flex flex-col items-center p-[40px] md:p-[60px] md:mt-[5rem] gap-[12px] min-h-screen  "
      id="works"
    >
      <span className="Header text-[2rem] lg:text-[4rem] font-bold flex gap-2">
        How it <p className="italic text-blue141">  Works</p> ?
      </span>

      <div className="Cards flex flex-col items-center  ">
        <div className="cards flex flex-col flex-wrap lg:flex-row gap-6  justify-center w-full h-[100%] items-center">
          {data.map((item, index) => {
            const isLastItem = index === data.length - 1;

            return (
              <>
                <div
                  key={item?.id}
                  className={`Card flex flex-col   items-center justify-between   
               backdrop-blur-2xl shadow-xl bg-opacity-20  transition-[0.3s] gap-2 p-5 rounded-[20px]   lg:hover:-translate-y-3.5 lg:hover:cursor-pointer bg-[#fff]  w-[250px] lg:w-[250px] h-auto md:h-[250px] ${
                 index % 2 !== 0 ? "mt-[2rem] md:mt-[10rem]" : ""
               }`}
                >
                  <div className="ico">{item?.icon}</div>
                  <div className="font-bold text-[1.3rem]">{item?.title}</div>
                  <div className="description text-center text-[18px] text-[#000]">
                    {item?.description}
                  </div>
                </div>
                <span className="hidden md:flex">
                  {!isLastItem && <LucideArrowBigRight color="black" />}
                </span>
                <span className="flex md:hidden">
                  {!isLastItem && <LucideArrowBigDown color="black" />}
                </span>
              </>
            );
          })}
        </div>
      </div>
      <br />
      <LucideArrowBigDown size="40" className="animateRight" />
      <button
        onClick={() => navigate("/brainheaters/form")}
        className="bg-[#2956A8]  text-[#ffff] font-semibold md:font-bold py-2 px-5 rounded-xl  md:py-3 md:px-3 text-[1.2rem] md:text-[1.5rem] md:rounded-xl md:mt-2 md:my-0 my-5 hover:transform hover:scale-105 hover:border-2 hover:border-[#2956A8] hover:bg-[#ffff] hover:text-[#2956A8] transition duration-300 ease-in-out  "
      >
        Post Your Requirement
      </button>
    </div>
  );
};

export default Steps;
