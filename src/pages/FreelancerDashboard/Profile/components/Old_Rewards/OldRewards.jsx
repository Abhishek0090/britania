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

export default function OldRewards({ color, rewards, handleRewardClaim }) {
  return (
    <>
      <div
        className={`flex flex-col items-center justify-center mb-4 rounded   ${color} w-[75vw]`}
      >
        <div className="timeline max-w-screen-2xl">
          <div className="outer">
            {rewards?.length > 0 && rewards[0]?.claimed == "1" && (
              <div className="card">
                <div className="info">
                  <h3 className="title">
                    <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                      Bluepen Kit{" "}
                    </span>

                    <span className=" flex items-center justify-start  md:h-32 ">
                      <img
                        src={KitImg}
                        alt="kit"
                        className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                      />
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
                      ? Stepper(rewards[0], handleRewardClaim, "3")
                      : null}
                  </section>
                  <p>
                    On completion of your first{" "}
                    <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                      3
                    </span>{" "}
                    assignments, you will receive a Bluepen Kit.
                  </p>
                </div>
              </div>
            )}
            {rewards?.length > 0 && rewards[1]?.claimed == "1" && (
              <div className="card">
                <div className="info">
                  <h3 className="title">
                    <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                      Money Plant
                    </span>

                    <span className=" flex items-center justify-end  md:h-32 ">
                      <img
                        src={MoneyPlantImg}
                        alt="moneyplant"
                        className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                      />
                    </span>
                  </h3>
                  <section>
                    {rewards[1]
                      ? Stepper(rewards[1], handleRewardClaim, "5")
                      : null}
                  </section>
                  <p>
                    On completion of your first{" "}
                    <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                      5
                    </span>{" "}
                    assignments, you will receive a Money Plant.
                  </p>
                </div>
              </div>
            )}
            {rewards?.length > 0 && rewards[2]?.claimed == "1" && (
              <div className="card">
                <div className="info">
                  <h3 className="title">
                    <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                      Recharge
                    </span>

                    <span className=" flex items-center justify-start  md:h-32">
                      <img
                        src={RechargeImg}
                        alt="recharge"
                        className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                      />
                    </span>
                  </h3>
                  <section>
                    {rewards[2]
                      ? Stepper(rewards[2], handleRewardClaim, "10")
                      : null}
                  </section>
                  <p>
                    On completion of your first{" "}
                    <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                      10
                    </span>{" "}
                    assignments, you will receive a mobile recharge.
                  </p>
                </div>
              </div>
            )}
            {rewards?.length > 0 && rewards[3]?.claimed == "1" && (
              <div className="card">
                <div className="info">
                  <h3 className="title">
                    <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                      2 Movie Tickets
                    </span>
                    <span className=" flex items-center justify-end  md:h-32 ">
                      <img
                        src={MovieTicketImg}
                        alt="movie ticket"
                        className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                      />
                    </span>
                  </h3>
                  <section>
                    {rewards[3]
                      ? Stepper(rewards[3], handleRewardClaim, "15")
                      : null}
                  </section>
                  <p>
                    On completion of your first{" "}
                    <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                      15
                    </span>{" "}
                    assignments, you will receive 2 movie tickets.
                  </p>
                </div>
              </div>
            )}
            {rewards?.length > 0 && rewards[4]?.claimed == "1" && (
              <div className="card">
                <div className="info">
                  <h3 className="title">
                    <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg">
                      Bluetooth Earphone
                    </span>

                    <span className=" flex items-center justify-start  md:h-32">
                      <img
                        src={EarphoneImg}
                        alt="earphone"
                        className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                      />
                    </span>
                  </h3>
                  <section>
                    {rewards[4]
                      ? Stepper(rewards[4], handleRewardClaim, "17")
                      : null}
                  </section>
                  <p>
                    On completion of your first{" "}
                    <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                      17
                    </span>{" "}
                    assignments, you will receive a pair of Bluetooth Earphone.
                  </p>
                </div>
              </div>
            )}
            {rewards?.length > 0 && rewards[5]?.claimed == "1" && (
              <div className="card">
                <div className="info">
                  <h3 className="title">
                    <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                      Zomato Gold
                    </span>
                    <span className=" flex items-center justify-end  md:h-32 ">
                      <img
                        src={ZomatoImg}
                        alt="zomato gold"
                        className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                      />
                    </span>
                  </h3>
                  <section>
                    {rewards[5]
                      ? Stepper(rewards[5], handleRewardClaim, "20")
                      : null}
                  </section>
                  <p>
                    On completion of your first{" "}
                    <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                      20
                    </span>{" "}
                    assignments, you will receive a Zomato Gold.
                  </p>
                </div>
              </div>
            )}
            {rewards?.length > 0 && rewards[6]?.claimed == "1" && (
              <div className="card">
                <div className="info">
                  <h3 className="title">
                    <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                      Sneakers
                    </span>

                    <span className=" flex items-center justify-start  md:h-32">
                      <img
                        src={SneakersImg}
                        alt="sneakers"
                        className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                      />
                    </span>
                  </h3>
                  <section>
                    {rewards[6]
                      ? Stepper(rewards[6], handleRewardClaim, "25")
                      : null}
                  </section>
                  <p>
                    On completion of your first{" "}
                    <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                      25
                    </span>{" "}
                    assignments, you will receive a pair of Sneakers.
                  </p>
                </div>
              </div>
            )}
            {rewards?.length > 0 && rewards[7]?.claimed == "1" && (
              <div className="card">
                <div className="info">
                  <h3 className="title">
                    <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                      Fashion Kit
                    </span>
                    <span className=" flex items-center justify-end  md:h-32 ">
                      <img
                        src={FashionImg}
                        alt="fashion kit"
                        className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                      />
                    </span>
                  </h3>
                  <section>
                    {rewards[7]
                      ? Stepper(rewards[7], handleRewardClaim, "40")
                      : null}
                  </section>
                  <p>
                    On completion of your first{" "}
                    <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                      40
                    </span>{" "}
                    assignments, you will receive a Fashion Kit.
                  </p>
                </div>
              </div>
            )}

            {rewards?.length > 0 && rewards[8]?.claimed == "1" && (
              <div className="card">
                <div className="info">
                  <h3 className="title">
                    <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                      Crypto Dropbox
                    </span>

                    <span className=" flex items-center justify-start  md:h-32">
                      <img
                        src={BitcoinImg}
                        alt="bitcoin"
                        className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                      />
                    </span>
                  </h3>
                  <section>
                    {rewards[8]
                      ? Stepper(rewards[8], handleRewardClaim, "50")
                      : null}
                  </section>
                  <p>
                    On completion of your first{" "}
                    <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                      50
                    </span>{" "}
                    assignments, you will receive a Crypto Dropbox.
                  </p>
                </div>
              </div>
            )}
            {rewards?.length > 0 && rewards[9]?.claimed == "1" && (
              <div className="card">
                <div className="info">
                  <h3 className="title">
                    <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                      Goa Trip
                    </span>

                    <span className=" flex items-center justify-end  md:h-32 ">
                      <img
                        src={GoaImg}
                        alt="goa trip"
                        className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                      />
                    </span>
                  </h3>
                  <section>
                    {rewards[9]
                      ? Stepper(rewards[9], handleRewardClaim, "75")
                      : null}
                  </section>
                  <p>
                    On completion of your first{" "}
                    <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                      75
                    </span>{" "}
                    assignments, you will receive a Goa Trip.
                  </p>
                </div>
              </div>
            )}

            {rewards?.length > 0 && rewards[10]?.claimed == "1" && (
              <div className="card">
                <div className="info">
                  <h3 className="title">
                    <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                      Smart TV
                    </span>

                    <span className=" flex items-center justify-start  md:h-32">
                      <img
                        src={TVImg}
                        alt="smart tv"
                        className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                      />
                    </span>
                  </h3>
                  <section>
                    {rewards[10]
                      ? Stepper(rewards[10], handleRewardClaim, "100")
                      : null}
                  </section>
                  <p>
                    On completion of your first{" "}
                    <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                      100
                    </span>{" "}
                    assignments, you will receive a Smart TV.
                  </p>
                </div>
              </div>
            )}
            {rewards?.length > 0 && rewards[11]?.claimed == "1" && (
              <div className="card">
                <div className="info">
                  <h3 className="title">
                    <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                      Smartphone
                    </span>
                    <span className=" flex items-center justify-end  md:h-32 ">
                      <img
                        src={PhoneImg}
                        alt="phone"
                        className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                      />
                    </span>
                  </h3>
                  <section>
                    {rewards[11]
                      ? Stepper(rewards[11], handleRewardClaim, "111")
                      : null}
                  </section>
                  <p>
                    On completion of your first{" "}
                    <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                      111
                    </span>{" "}
                    assignments, you will receive a Smartphone.
                  </p>
                </div>
              </div>
            )}
            {rewards?.length > 0 && rewards[12]?.claimed == "1" && (
              <div className="card">
                <div className="info">
                  <h3 className="title">
                    <span className="bg-blue141 rounded-3xl  md:py-[0.75rem]  md:px-[1.5rem] p-2 text-center font-medium md:text-2xl text-lg  ">
                      Laptop
                    </span>

                    <span className=" flex items-center justify-start  md:h-32">
                      <img
                        src={LaptopImg}
                        alt="laptop"
                        className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                      />
                    </span>
                  </h3>
                  <section>
                    {rewards[12]
                      ? Stepper(rewards[12], handleRewardClaim, "150")
                      : null}
                  </section>
                  <p>
                    On completion of your first{" "}
                    <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                      150
                    </span>{" "}
                    assignments, you will receive a Laptop.
                  </p>
                </div>
              </div>
            )}
            {rewards?.length > 0 && rewards[13]?.claimed == "1" && (
              <div className="card">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
