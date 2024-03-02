import Slider from "react-slick";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
export default function Testimonial() {
  const users = [
    {
      id: 1,
      name: "Suman Kumar",
      review:
        "I simply can't express my gratitude to BluePen enough for the top-notch content they produced for my project. I sincerely appreciate the effort you and your staff put forth to complete all of these pages. I am aware that there was a lot of work to be done in a short amount of time, yet they handled everything for me flawlessly, from choosing the appropriate keywords to creating the content. The final outcomes are more than acceptable. They have a policy for quality control.",
    },
    {
      id: 2,
      name: "sayyed saima",
      review:
        "I had a great experience with Bluepen for my final year project. Their team was very supportive and helped me throughout the process. I'm really happy with the outcome and highly recommend them to anyone looking for help with their final year projects.",
    },
    {
      id: 3,
      name: "Mathew k Jose",
      review:
        "I was hesitant about using an online writing service for my essay, but Bluepen exceeded my expectations. Their writers were knowledgeable and produced a well-researched and well-written essay. I received a high grade and was impressed with their attention to detail.",
    },
    {
      id: 4,
      name: "Kolli Dheemanth Reddy",
      review:
        "Bluepen helped me with my coding assignments and their work was exceptional. They provided clear explanations and guidance, which made the process a lot easier. I received excellent grades on my assignments thanks to their help.",
    },
    {
      id: 5,
      name: "Tanay Rangankar",
      review:
        "I was struggling with my project and required help in sorting information out, organising it. I was helped a lot by the company in framing the project and the ultimate product. It was awesome and the process was incredibly smooth. Kudos to the team and thank you so much.",
    },
    {
      id: 6,
      name: "Lavanya Ganesan",
      review:
        "The essay I received from Bluepen was outstanding! Their team of writers not only understood the requirements but also went above and beyond to deliver a high-quality essay that exceeded my expectations.",
    },
    {
      id: 7,
      name: "Kartik Mittal",
      review:
        "I had a tight deadline, required assistance with completing my college assignment, and had tests. Bluepen came to my aid and helped me out of the predicament by completing the project on schedule. Throughout the process, Saurav, the project manager, was always available for consultation. I heartily endorse them for assignment assistance.",
    },
  ];

  const settings = {
    vertical: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 600,
    cssEase: "linear",
  };
  const settings2 = {
    vertical: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    cssEase: "linear",
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col items-center justify-center text-2xl font-semibold md:text-5xl">
        <span className="max-w-5xl px-5 md:pb-10 font-bold text-center break-words ">
          Assignments By Top 5% of Experts
        </span>
        <button className="w-32 py-1 mt-5 text-lg text-white rounded-full bg-blue141 md:font-SemiBold md:text-2xl md:py-3 md:w-48">
          Join Them
        </button>
      </div>
      <div className="flex flex-col my-10 py-5 md:py-20  px-10  mx-auto md:max-w-[95rem]  bg-white rounded-xl shadow-lg  bg-opacity-20  drop-shadow-lg">
        <div className="px-4 md:py-0 md:mx-32 sm:px-6  lg:mr-0 md::pl-8 lg:pr-0">
          <div className="grid md:gap-y-2 md:grid-cols-3 md:items-center md:gap-x-16">
            <div className="max-w-3xl text-center sm:text-left">
              <h2 className="py-8 md:text-[2rem] font-bold text-xl text-gray-800">
                What our students are saying about us
              </h2>

              <p className="mb-5 md:mt-4 text-gray-800 ">
                Discover how our expert freelancers have helped students from a
                range of academic backgrounds achieve success in their
                assignments and projects, through their feedback
                and testimonials.
              </p>
            </div>

            <div className="hidden md:block col-span-1 lg:col-span-2 lg:mx-0 swiper-container !overflow-hidden">
              <div className="flex flex-row">
                <div className="flex flex-col  w-96 py-5 mx-5 rounded-t-xl">
                  <Slider {...settings}>
                    {users.map((item) => (
                      <div
                        key={item?.id}
                        className="p-6 my-3  text-black bg-white shadow-lg rounded-xl "
                      >
                        <p>{item.review}</p>
                        <div className="flex items-center mt-4 space-x-4">
                          {/* <img
                            src={item.avatar}
                            alt={item.name}
                            className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                          /> */}
                          <div>
                            <p className="text-lg font-semibold">{item.name}</p>
                            {/* <p className="text-sm dark:text-gray-400">
                              {item.designation}
                            </p> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="flex  w-96 flex-col mx-5 rounded-t-xl rounded-b-xl">
                  <Slider {...settings2}>
                    {users.slice(0, 5).map((item) => (
                      <div
                        key={item?.id}
                        className="p-6 my-3  text-black bg-white shadow-lg rounded-xl "
                      >
                        <p>{item.review}</p>
                        <div className="flex items-center mt-4 space-x-4">
                          <div>
                            <p className="text-lg font-semibold">{item.name}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
            <div className="md:hidden block col-span-1 lg:col-span-2 lg:mx-0 swiper-container !overflow-hidden">
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
                {users.map((item, i) => (
                  <SwiperSlide key={i} className="swiper-slide">
                    <div
                      key={item?.id}
                      className="p-6 my-3 text-black bg-white shadow-lg rounded-xl "
                    >
                      <p>
                        {item.review.length > 200 ? (
                          <span>
                            {item.review.slice(0, 200)}{" "}
                            <span className="text-blue6f9">Read More</span>
                          </span>
                        ) : (
                          item.review
                        )}
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        {/* <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                        /> */}
                        <div>
                          <p className="text-lg font-semibold">{item.name}</p>
                          {/* <p className="text-sm dark:text-gray-400">
                            {item.designation}
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
