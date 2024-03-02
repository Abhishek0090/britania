import { Collections, Group, School, Support, SupportAgent } from "@mui/icons-material";
import React from "react";
import CountUp from "react-countup";

const Growth = () => {
  const data = [
    {
      id: 1,
      icon: <Group sx={{ fontSize: "50px" }} />,
      title: "Active Students",
      counter: "16500",
    },
    {
      id: 2,
      icon: <School sx={{ fontSize: "50px" }} />,
      title: "Collegs Daily Users",
      counter: "4000",
    },
    {
      id: 3,
      icon: <Collections sx={{ fontSize: "50px" }} />,
      title: "Resources",
      counter: "2000",
    },
    {
      id: 4,
      icon: <SupportAgent sx={{ fontSize: "50px" }} />,
      title: "Supporting",
      counter: "1000",
    },
  ];

  return (
    <div className="w-full   flex flex-col items-center p-[20px] gap-[12px]   backdrop-blur-2xl shadow-xl ">
      <div className="Cards flex flex-col items-center p-5  ">
        <div className="cards flex flex-row lg:flex-row flex-wrap    w-full h-[100%]">
          {data.map((item) => {
            return (
              <div
                key={item?.id}
                className="Card flex flex-col items-center justify-between   
                 gap-2 p-5 rounded-[20px] w-[150px] lg:w-[300px]"
              >
                <div className="ico">{item?.icon}</div>
                <br />
                <div className="  font-bold text-black text-[1.1rem]">
                  <CountUp end={item.counter} /> +
                </div>
                <div className="description text-center text-[#000]">
                  {item?.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Growth;
