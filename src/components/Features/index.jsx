import React from "react";
import CountUp from "react-countup";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Features = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      loop={true}
      slidesPerView={1}
      spaceBetween={32}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          centeredSlides: true,
          slidesPerView: 1.25,
        },
        1024: {
          centeredSlides: false,
          slidesPerView: 1.5,
        },
      }}
      navigation={{
        nextEl: ".next-button",
        prevEl: ".prev-button",
      }}
    >
      <SwiperSlide>
        <li className="flex flex-col gap-0 md:flex-col xl:flex-col md:justify-center items-center justify-center bg-white text-black rounded-lg h-[13rem] md:h-72 py-2   md:w-52  hover:transform hover:scale-105 transition duration-300 ease-in-out rounded-2xl">
          <h1 className="text-[1.8rem] md:text-[1.5rem] font-semibold text-center">
            Trusted by
          </h1>
          <h2 className="md:text-[3.5rem] text-[2.5rem] font-Bold text-center text-[#2956A8] ">
            <CountUp end={3000} /> +
          </h2>
          {/* <p className="text-[2.5rem] font-semibold text-center"></p> */}
          <p className="text-[1.8rem] md:text-[1.5rem] font-semibold text-center">
            Students
          </p>
        </li>
      </SwiperSlide>

      <SwiperSlide>
        <li className="flex flex-col md:flex-col xl:flex-col justify-center md:justify-center items-center bg-white text-black  rounded-lg  h-[13rem] md:h-72 py-2   md:w-52  hover:transform hover:scale-105 transition duration-300 ease-in-out rounded-2xl">
          <h1 className="text-[1.8rem] md:text-[1.5rem]  font-semibold text-center">
            More than
          </h1>
          <h2 className="md:text-[3.5rem] text-[2.5rem] font-Bold text-center text-[#E58833] ">
            <CountUp end={400} />
          </h2>
          <h3 className="text-[1.8rem] md:text-[1.5rem] font-semibold text-center">
            Genuine & writers
          </h3>
        </li>
      </SwiperSlide>

      <SwiperSlide>
        <li className="flex flex-col md:flex-col xl:flex-col justify-center md:justify-center items-center bg-white text-black rounded-lg   md:h-72 py-2   md:w-52 hover:transform hover:scale-105 transition duration-300 ease-in-out rounded-2xl">
          <h1 className="text-[1.8rem] md:text-[1.5rem]  font-semibold text-center">
            More than
          </h1>
          <h2 className="md:text-[3.5rem] text-[2.5rem] font-Bold text-center text-[#2956A8]">
            <CountUp end={1000} />
          </h2>
          <h3 className="text-[1.8rem] md:text-[1.5rem] font-semibold text-center">
            Domains & subjects
          </h3>
          <p className="text-[1.8rem] md:text-[1.5rem] font-semibold text-center">
            covered
          </p>
        </li>
      </SwiperSlide>
    </Swiper>
  );
};

export default Features;
