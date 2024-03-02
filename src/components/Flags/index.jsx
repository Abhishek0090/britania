import Marquee from "react-fast-marquee";
import india from "~/assets/flags/ind.png";
import unitedkingdom from "~/assets/flags/uk.png";
import australia from "~/assets/flags/australia.png";
import singapore from "~/assets/flags/singapore.png";
import canada from "~/assets/flags/canada.png";
import ireland from "~/assets/flags/ireland.png";

export default function Flags() {
  const ImgArray = [
    { id: 1, img: unitedkingdom },
    { id: 2, img: australia },
    { id: 3, img: india },
    { id: 4, img: singapore },
    { id: 5, img: canada },
    { id: 6, img: ireland },
  ];

  return (
    <div
      className={`flex items-center justify-center w-full h-full  font-league bg-opacity-20  md:py-4 py-1 md:py-0 md:px-5 mt-4 md:mt-5 lg:mt-0`}
    >
      <div className="flex flex-col w-full  items-center gap-5 justify-center text-sm md:text-3xl font-SemiBold uppercase text-blue141">
        {/* <Slider {...settings}>{ServicesData}</Slider> */}
        <span className="text-blue141 text-[1.3rem] md:text-[1.8rem] font-bold mb-2 text-center">
          Present in Universities of{" "}
        </span>
        <Marquee style={{ width: "90%" }}>
          <div className="flex">
            {ImgArray?.map((item, index) => (
              <img
                key={item.id}
                src={item?.img}
                width="58"
                height="46"
                alt="Country"
                loading="lazy"
                className="mr-[2rem] ml-[2rem]"
              />
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}
