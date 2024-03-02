import Slider from "react-slick";
import { ServicesList } from "~/components/ServicesScroll/ServicesList";
export default function ServicesScroll({ customStyles }) {
  const settings = {
    vertical: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    cssEase: "linear",
  };

  const ServicesData = ServicesList.map((item, i) => (
    <h1
      key={i}
      className={`text-sm md:text-2xl font-bold text-[#2956A8] text-center md:px-2 px-1`}
    >
      {item.name}
    </h1>
  ));

  return (
    <div
      className={` w-full   font-league bg-opacity-20 ${customStyles}   md:py-2 py-3 md:px-5 mt-2 md:mt-5 lg:mt-0`}
    >
      <div className="flex flex-row items-center justify-center text-sm md:text-2xl font-SemiBold uppercase text-white">
        <span className={`pl-2 text-[#E58833] font-bold`}>
          Get an expert for
        </span>
        <Slider {...settings}>{ServicesData}</Slider>
        {/* <span className="md:pl-2 text-blue141">to do your assignment</span> */}
      </div>
    </div>
  );
}
