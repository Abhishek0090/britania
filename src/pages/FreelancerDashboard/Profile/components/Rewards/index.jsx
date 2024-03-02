import KitImg from "~/assets/rewards/kit.png";
import MoneyPlantImg from "~/assets/rewards/moneyPlant.png";
import RechargeImg from "~/assets/rewards/recharge.png";
import MovieTicketImg from "~/assets/rewards/movie.png";
import EarphoneImg from "~/assets/rewards/earphone.png";
import ZomatoImg from "~/assets/rewards/food.png";
import SneakersImg from "~/assets/rewards/shoes.png";
import FashionImg from "~/assets/rewards/fashion.png";
import GoaImg from "~/assets/rewards/goa.png";
import BitcoinImg from "~/assets/rewards/bitcoin.png";
import TVImg from "~/assets/rewards/tv.png";
import PhoneImg from "~/assets/rewards/phone.png";
import LaptopImg from "~/assets/rewards/laptop.png";
import TwoWheelerImg from "~/assets/rewards/bike.png";
import React from "react";
import CustomSvg from "../../../../../components/Shield/Shield";

function Stepper(rewardObj, handleRewardClaim, numberOfAss) {
  return (
    <React.Fragment>
      {rewardObj?.eligible === "Yes" ? (
        <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm md:text-xl">
          {rewardObj?.claimed !== null ? (
            <span className="text-green-500">Claimed</span>
          ) : (
            <button
              onClick={() => handleRewardClaim(numberOfAss)}
              className="bg-pink-500 text-white px-2  rounded-3xl z-50"
            >
              Claim Now
            </button>
          )}

          {rewardObj?.sent !== null && rewardObj?.sent !== "0" ? (
            <div className="flex items-center w-20 md:w-[6.5rem]">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-green-500 ">In Transit</span>
            </div>
          ) : null}

          {rewardObj?.received !== null && rewardObj?.received !== "0" ? (
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-green-500">Received</span>
            </div>
          ) : null}
        </ol>
      ) : null}
    </React.Fragment>
  );
}

export default function Reward({ color, rewards, handleRewardClaim }) {
  console.log(rewards);
  return (
    <>
      <div
        className={`flex flex-col items-center justify-center mb-4 rounded   ${color} w-[75vw]`}
      >
        <div className="timeline max-w-screen-2xl">
          <div className="outer">
            <div className="card">
              <div className="info">
                <h3 className="title">
                  <span className=" flex items-center justify-start  md:h-32 ">
                    {/* <img
                      src={KitImg}
                      alt="kit"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    /> */}
                    <CustomSvg color="bronze" text="I" />
                  </span>
                  <span className="bg-orange-800 rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg  ">
                    Bronze I{" "}
                  </span>
                </h3>
                {/* {rewards[0]?.number_of_assignments === '3' ? (
                  <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    {rewards[0]?.claimed !== null ? (
                      <span className="text-green-500">Claimed</span>
                    ) : (
                      <button
                        onClick={handleRewardClaim}
                        className="bg-pink-500 text-white px-2  rounded-3xl z-50"
                      >
                        Claim Now
                      </button>
                    )}

                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {rewards[0]?.sent !== null && rewards[0]?.sent !== '0' ? (
                        <span className="text-green-500">In Transit</span>
                      ) : (
                        <button className="text-white">In Transit</button>
                      )}
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {rewards[0]?.received !== null &&
                      rewards[0]?.received !== '0' ? (
                        <span className="text-green-500">Received</span>
                      ) : (
                        <button className="text-white">Received</button>
                      )}
                    </div>
                  </ol>
                ) : null} */}
                <section>
                  {rewards[0]
                    ? Stepper(rewards[0], handleRewardClaim, "5")
                    : null}
                </section>
                <p>
                  {/* On completion of your first{' '} */}
                  When you start your journey with{" "}
                  <b className="text-blue141">Bluepen</b>
                  {/* <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                    3
                  </span>{' '} */}
                  {/* assignments, you will receive a Bluepen Kit. */}
                </p>
              </div>
            </div>
            <div className="card">
              <div className="info">
                <h3 className="title">
                  {/* <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                    Money Plant
                  </span> */}

                  <span className=" flex items-center justify-end  md:h-32 ">
                    {/* <img
                      src={MoneyPlantImg}
                      alt="moneyplant"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    /> */}
                    <CustomSvg color="bronze" text="II" />
                  </span>
                  <span className="bg-orange-800  rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg  ">
                    Bronze II
                  </span>
                </h3>
                <section>
                  {rewards[1]
                    ? Stepper(rewards[1], handleRewardClaim, "15")
                    : null}
                </section>
                <p>
                  On completion of your first{" "}
                  <span className="text-white text-xl font-semibold bg-orange-800 rounded-full px-2">
                    15
                  </span>{" "}
                  assignments, you will receive a Surprise Gift.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="info">
                <h3 className="title">
                  <span className=" flex items-center justify-start  md:h-32">
                    {/* <img
                      src={RechargeImg}
                      alt="recharge"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    /> */}
                    <CustomSvg color="bronze" text="III" />
                  </span>
                  <span className="bg-orange-800  rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg  ">
                    Bronze III
                  </span>
                </h3>
                <section>
                  {rewards[2]
                    ? Stepper(rewards[2], handleRewardClaim, "20")
                    : null}
                </section>
                <p>
                  On completion of your first{" "}
                  <span className="text-white text-xl font-semibold bg-orange-800 rounded-full px-2">
                    20
                  </span>{" "}
                  assignments, you will receive a Surprise Gift.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="info">
                <h3 className="title">
                  <span className=" flex items-center justify-end  md:h-32 ">
                    {/* <img
                      src={MovieTicketImg}
                      alt="movie ticket"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    /> */}
                    <CustomSvg color="silver" text="I" />
                  </span>
                  <span className="bg-gray-500 rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg  ">
                    Silver I
                  </span>
                </h3>
                <section>
                  {rewards[3]
                    ? Stepper(rewards[3], handleRewardClaim, "25")
                    : null}
                </section>
                <p>
                  On completion of your first{" "}
                  <span className="text-white text-xl font-semibold bg-gray-500 rounded-full px-2">
                    25
                  </span>{" "}
                  assignments, you will receive a Surprise Gift.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="info">
                <h3 className="title">
                  {/* <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg">
                    Bluetooth Earphone
                  </span> */}

                  <span className=" flex items-center justify-start  md:h-32">
                    {/* <img
                      src={EarphoneImg}
                      alt="earphone"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    /> */}
                    <CustomSvg color="silver" text="II" />
                  </span>
                  <span className="bg-gray-500 rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg">
                    Silver II
                  </span>
                </h3>
                <section>
                  {rewards[4]
                    ? Stepper(rewards[4], handleRewardClaim, "50")
                    : null}
                </section>
                <p>
                  On completion of your first{" "}
                  <span className="text-white text-xl font-semibold bg-gray-500 rounded-full px-2">
                    50
                  </span>{" "}
                  assignments, you will receive a Surprise Gift.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="info">
                <h3 className="title">
                  {/* <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                    Zomato Gold
                  </span> */}
                  <span className=" flex items-center justify-end  md:h-32 ">
                    {/* <img
                      src={ZomatoImg}
                      alt="zomato gold"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    /> */}
                    <CustomSvg color="silver" text="III" />
                  </span>
                  <span className="bg-gray-500 rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg  ">
                    Silver III
                  </span>
                </h3>
                <section>
                  {rewards[5]
                    ? Stepper(rewards[5], handleRewardClaim, "100")
                    : null}
                </section>
                <p>
                  On completion of your first{" "}
                  <span className="bg-gray-500 rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg text-white ">
                    100
                  </span>{" "}
                  assignments, you will receive a Surprise Gift.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="info">
                <h3 className="title">
                  {/* <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                    Sneakers
                  </span> */}

                  <span className=" flex items-center justify-start  md:h-32">
                    {/* <img
                      src={SneakersImg}
                      alt="sneakers"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    /> */}

                    <CustomSvg color="gold" text="I" />
                  </span>
                  <span className="bg-yellow-800 rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg  ">
                    Gold I
                  </span>
                </h3>
                <section>
                  {rewards[6]
                    ? Stepper(rewards[6], handleRewardClaim, "200")
                    : null}
                </section>
                <p>
                  On completion of your first{" "}
                  <span className="text-white text-xl font-semibold bg-yellow-800 rounded-full px-2">
                    200
                  </span>{" "}
                  assignments, you will receive a Surprise Gift.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="info">
                <h3 className="title">
                  <span className=" flex items-center justify-end  md:h-32 ">
                    {/* <img
                      src={FashionImg}
                      alt="fashion kit"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    /> */}

                    <CustomSvg color="gold" text="II" />
                  </span>
                  <span className="bg-yellow-800 rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg  ">
                    Gold II
                  </span>
                </h3>
                <section>
                  {rewards[7]
                    ? Stepper(rewards[7], handleRewardClaim, "300")
                    : null}
                </section>
                <p>
                  On completion of your first{" "}
                  <span className="text-white text-xl font-semibold bg-yellow-800 rounded-full px-2">
                    300
                  </span>{" "}
                  assignments, you will receive a Surprise Gift.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="info">
                <h3 className="title">
                  {/* <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                    Crypto Dropbox
                  </span> */}

                  <span className=" flex items-center justify-start  md:h-32">
                    {/* <img
                      src={BitcoinImg}
                      alt="bitcoin"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    /> */}

                    <CustomSvg color="gold" text="III" />
                  </span>
                  <span className="bg-yellow-800 rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg  ">
                    Gold III
                  </span>
                </h3>
                <section>
                  {rewards[8]
                    ? Stepper(rewards[8], handleRewardClaim, "400")
                    : null}
                </section>
                <p>
                  On completion of your first{" "}
                  <span className="bg-yellow-800 text-white rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg  ">
                    400
                  </span>{" "}
                  assignments, you will receive a Surprise Gift.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="info">
                <h3 className="title">
                  <span className=" flex items-center justify-end  md:h-32 ">
                    {/* <img
                      src={GoaImg}
                      alt="goa trip"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    /> */}
                    <CustomSvg color="platinum" text="I" />
                  </span>
                  <span className="bg-gray-600 rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg">
                    Platinum I
                  </span>{" "}
                </h3>
                <section>
                  {rewards[9]
                    ? Stepper(rewards[9], handleRewardClaim, "500")
                    : null}
                </section>
                <p>
                  On completion of your first{" "}
                  <span className="text-white text-xl font-semibold bg-gray-600 rounded-full px-2">
                    500
                  </span>{" "}
                  assignments, you will receive a Surprise Gift.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="info">
                <h3 className="title">
                  <span className=" flex items-center justify-start  md:h-32">
                    {/* <img
                      src={TVImg}
                      alt="smart tv"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    /> */}
                    <CustomSvg color="platinum" text="II" />
                  </span>
                  <span className="bg-gray-600 rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg  ">
                    Platinum II
                  </span>
                </h3>
                <section>
                  {rewards[10]
                    ? Stepper(rewards[10], handleRewardClaim, "750")
                    : null}
                </section>
                <p>
                  On completion of your first{" "}
                  <span className="text-white text-xl font-semibold bg-gray-600 rounded-full px-2">
                    750
                  </span>{" "}
                  assignments, you will receive a Surprise Gift.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="info">
                <h3 className="title">
                  <span className=" flex items-center justify-end  md:h-32 ">
                    {/* <img
                      src={PhoneImg}
                      alt="phone"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    /> */}
                    <CustomSvg color="platinum" text="III" />
                  </span>
                  <span className="bg-gray-600 rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg  ">
                    Platinum III
                  </span>
                </h3>
                <section>
                  {rewards[11]
                    ? Stepper(rewards[11], handleRewardClaim, "1000")
                    : null}
                </section>
                <p>
                  On completion of your first{" "}
                  <span className="text-white text-xl font-semibold bg-gray-600 rounded-full px-2">
                    1000
                  </span>{" "}
                  assignments, you will receive a Surprise Gift.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="info">
                <h3 className="title">
                  {/* <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                    Laptop
                  </span> */}

                  <span className=" flex items-center justify-start  md:h-32">
                    {/* <img
                      src={LaptopImg}
                      alt="laptop"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    /> */}
                    <CustomSvg color="diamond" text="" />
                  </span>
                  <span className="bg-blue141 rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg  ">
                    Diamond
                  </span>
                </h3>
                <section>
                  {rewards[12]
                    ? Stepper(rewards[12], handleRewardClaim, "1000")
                    : null}
                </section>
                <p>
                  On completion of your first{" "}
                  <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                    1000
                  </span>{" "}
                  assignments, you will receive a Surprise Gift.
                </p>
              </div>
            </div>
            {/* <div className="card">
              <div className="info">
                <h3 className="title">
                  <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                    Two Wheeler
                  </span>
                  <span className=" flex items-center justify-end  md:h-32 ">
                    <img
                      src={TwoWheelerImg}
                      alt="two wheeler"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    />
                  </span>
                </h3>
                <section>
                  {rewards[13]
                    ? Stepper(rewards[13], handleRewardClaim, "200")
                    : null}
                </section>
                <p>
                  On completion of your first{" "}
                  <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                    200
                  </span>{" "}
                  assignments, you will receive a Two Wheeler.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
