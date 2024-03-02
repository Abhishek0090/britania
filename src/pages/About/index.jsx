import AboutImg from "~/assets/about.png";
import { Helmet } from "react-helmet-async";
import AboutMImg from "~/assets/about-m.png";
import thesisImg from "~/assets/about/thesis.png";
import researchImg from "~/assets/about/research.png";
import codingImg from "~/assets/about/coding.png";
import MissionImg from "~/assets/about/mission.png";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Marketing from "~/utils/Marketing";
import {
  LucideCalendarCheck2,
  LucideChevronLeft,
  LucideChevronRight,
  LucideStar,
} from "lucide-react";
import { Autoplay, Pagination, Navigation, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const timeline = [
  {
    id: 1,
    date: "April 2020",
    title: "Inception of the idea.",
  },
  {
    id: 2,
    date: "August 2020",
    title: "Got the first call for customised project.",
  },
  {
    id: 3,
    date: "December 2020",
    title: "Hit a student base of 500.",
  },
  {
    id: 4,
    date: "March 2021",
    title: "International student acquisition.",
  },
  {
    id: 5,
    date: "December  2021",
    title: "Inaugural of the headquarters.",
  },
  {
    id: 6,
    date: "May 2022",
    title: "Aquired 2500+ students.",
  },
  {
    id: 6,
    date: "Jan 2023",
    title:
      "40+ full time freelancers and a pool of 300+ part time freelancers pan india.",
  },
  {
    id: 6,
    date: "April 2023",
    title: "Present in 6+ countries.",
  },
];

const ServiceImg = [
  {
    id: 1,
    img: thesisImg,
    title: "Dissertation & Thesis",
    desc: "From research proposals to complete dissertations, our expert writers can help you with every aspect of the dissertation and thesis writing process, ensuring you achieve the best results possible.",
  },
  {
    id: 2,
    img: researchImg,
    title: "Statement of purpose",
    desc: "Our statement of purpose writing service is designed to help students create a compelling narrative that showcases their skills, experience, and goals, while meeting the requirements of their chosen academic program.",
  },
  {
    id: 3,
    img: codingImg,
    title: "Coding assignments",
    desc: "From basic programming concepts to complex algorithms, our experienced programmers can provide comprehensive solutions to your coding assignments, delivering high-quality work that meets your requirements and exceeds your expectations.",
  },
];

export default function About() {
  // shrink image when scroll down
  const [imgWidth, setImgWidth] = useState(100);
  const [imgHeight, setImgHeight] = useState(90);

  const [imgMobileWidth, setImgMobileWidth] = useState(100);
  const [imgMobileHeight, setImgMobileHeight] = useState(70);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const imgWidth = 100 - scroll / 10;
      const imgHeight = 90 - scroll / 10;
      setImgWidth(imgWidth);
      setImgHeight(imgHeight);
    };

    const handleMobileScroll = () => {
      const scroll = window.scrollY;
      const imgWidth = 100 - scroll / 10;
      const imgHeight = 70 - scroll / 10;
      setImgMobileWidth(imgWidth);
      setImgMobileHeight(imgHeight);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleMobileScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleMobileScroll);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>About | Bluepen</title>
      </Helmet>
      <Marketing pageName="About" />
      {/* TODO: Hero Image */}

      {window?.innerWidth > 768 ? (
        <div
          style={{
            position: "relative",
            height: "80vh",
            width: "100vw",
            transformStyle: "inherit",
            zIndex: -1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 5vw",
            marginTop: "10px",
          }}
        >
          <motion.img
            src={AboutImg}
            style={{
              height: `${imgHeight}vh`,
              width: `${imgWidth}vw`,
              margin: "0 auto ",
              position: "absolute",
              top: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              objectFit: "cover",
              zIndex: -1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
          />
        </div>
      ) : (
        <div
          style={{
            position: "relative",
            height: "50vh",
            width: "100vw",
            transformStyle: "inherit",
            zIndex: -1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 5vw",
          }}
        >
          <motion.img
            src={AboutMImg}
            style={{
              height: `${imgMobileHeight}vh`,
              width: `${imgMobileWidth}vw`,
              margin: "0 auto ",
              position: "absolute",
              top: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              objectFit: "contain",
              zIndex: -1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
          />
        </div>
      )}

      {/* TODO: Story */}
      <div>
        <section className=" backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-xl ">
          <div className="flex flex-col items-center justify-center py-3">
            <span className="text-[42pt] font-bold text-gray-800">
              Our Story
            </span>
            <span className="px-5 text-md md:text-2xl tracking-normal   text-gray-800 max-w-5xl text-justify pt-1">
              First things first, we are a bunch of guys wearing shorts and
              Tshirts figuring out how to make your lives even more simpler.
              EarPods & bluetooth headphones became more prominent, cause why?
              Because untangling the earphones was more time consuming and
              effort taking. Guess what? This became our mission statement as
              well as our <span id="start1">tagline</span>
            </span>
            <span className="mt-5 text-2xl md:text-5xl md:bg-transparent bg-blue141 backdrop-filter md:backdrop-blur-0 backdrop-blur-md bg-opacity-80 md:text-blue141 text-gray-100 p-2 px-5 rounded-3xl flex items-center max-w-5xl text-center font-semibold md:mt-5">
              <span>Bluepen : You are not alone!</span>
            </span>
          </div>
          <div className="px-4 md:py-16 md:mx-32 sm:px-6  lg:mr-0 md::pl-8 lg:pr-0">
            <div className="grid  md:gap-y-8 md:grid-cols-3 md:items-center md:gap-x-16">
              <div className="max-w-3xl text-justify sm:text-left">
                <h2 className="py-8 md:text-[42pt] font-bold text-xl text-gray-800">
                  Our Timeline
                </h2>

                <p className="mb-5 text-gray-800   md:text-[13pt] ">
                  We started off as a bunch of guys who wanted to make a
                  difference in the world. We started off with a simple idea of
                  making a platform where people can share their thoughts and
                  ideas without any fear of being judged.
                </p>

                <div className="hidden lg:mt-8 lg:flex lg:gap-4">
                  <button className="p-3 border rounded-full prev-button bg-blue141 border-blue141 text-white hover:bg-blue6f9 hover:border-blue6f9 hover:text-white">
                    <span className="sr-only">Previous Slide</span>
                    <LucideChevronLeft />
                  </button>

                  <button className="p-3 border rounded-full next-button bg-blue141 border-blue141 text-white hover:bg-blue6f9 hover:border-blue6f9 hover:text-white">
                    <span className="sr-only">Next Slide</span>
                    <LucideChevronRight />
                  </button>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-2 lg:mx-0 swiper-container !overflow-hidden">
                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  loop={true}
                  slidesPerView={1}
                  spaceBetween={32}
                  autoplay={{
                    delay: 3000,
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
                  {timeline.map((t) => (
                    <SwiperSlide
                      key={t?.id}
                      className="swiper-slide h-80 bg-blue6f9 rounded-xl   bg-opacity-20 backdrop-blur-lg drop-shadow-lg justify-between w-full  p-12  flex flex-col items-center  mx-auto space-y-6 md:p-8"
                    >
                      <LucideCalendarCheck2
                        className="text-3xl text-blue141"
                        size={70}
                      />
                      <div className="flex justify-center space-x-3">
                        <div>
                          <p className="md:text-xl font-medium leading-tight uppercase">
                            {t?.date?.split(" ")[0]}
                          </p>
                          <p className="text-xl leading-tight text-center ">
                            {t?.date?.split(" ")[1]}
                          </p>
                        </div>
                      </div>
                      <p className="px-6 py-2  text-2xl font-semibold text-center sm:font-bold  md:text-4xl lg:max-w-2xl xl:max-w-4xl ">
                        "{t?.title}"
                      </p>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* TODO: Mission Statement */}
      <div className="mx-auto ">
        <section className="p-8 rounded-lg">
          <div className="flex flex-col items-center justify-center pt-3">
            <span className="text-[42pt] font-bold text-gray-800">
              Our Mission
            </span>
          </div>
          <div className="grid grid-cols-1 gap-x-12 md:grid-cols-3 sm:items-center">
            <img
              alt="Mission Statement"
              src={MissionImg}
              className="object-cover w-full h-full rounded-lg "
            />

            <blockquote className="sm:col-span-2">
              <p className=" text-[12pt]  tracking-wide sm:text-2xl">
                We are a by the students for the students venture/website who
                assist you with all sorts of extra load like college
                assignments, helping in projects, journals, PPTs, black books,
                report writing, content writing, MBA research papers, final year
                engineering projects and it goes on. A student's daily life
                includes a lot of academic tension not allowing them to focus on
                the bigger picture & be more productive with their time. If you
                like the idea, please do follow Bluepen and try reaching out to
                us for your needs and we'll figure out a way
              </p>
            </blockquote>
          </div>
        </section>
      </div>

      {/* TODO: Services Section */}
      <section className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-30">
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-[42pt] font-bold tracking-tight sm:text-5xl">
              Our Services
            </h2>

            <p className="max-w-2xl text-[18pt] mx-auto mt-4 text-gring-offset-warm-gray-500">
              At our freelancing portal, we understand that academic success is
              crucial for students. That's why we offer a range of professional
              services to help you achieve your academic goals. Whether you need
              help with writing, coding, or statements of purpose, we've
              got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-2   rounded-lg shadow-xl bg-opacity-50 hover:bg-opacity-100 hover:shadow-2xl hover:border-transparent backdrop-filter backdrop-blur-lg hover:backdrop-blur-xl"
              >
                <img
                  alt="Service"
                  src={ServiceImg[i].img}
                  className="object-cover w-72 mt-3 mx-auto h-72 rounded-lg "
                />
                <h3 className="mt-6 text-2xl capitalize font-bold text-center text-gray-900">
                  {ServiceImg[i].title}
                </h3>
                <blockquote className="flex flex-col justify-between p-12 -mt-6 text-justify ">
                  <p className="text-sm text-gray-500">{ServiceImg[i].desc}</p>

                  <div className="mt-8 flex justify-center gap-0.5 text-green-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <LucideStar
                        key={i}
                        className="text-yellow-400"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
