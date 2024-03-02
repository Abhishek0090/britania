import React from "react";
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
import CustomSvg from "../Shield/Shield";

export default function Reward({ color }) {
  return (
    <React.Fragment>
      <div
        className={`flex flex-col items-center justify-center mb-4 rounded   ${color} w-[75vw]`}
      >
        <div className="timeline max-w-screen-2xl">
          <div className="outer">
            <div className="card">
              <div className="info">
                <h3 className="title ">
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
                <p>
                  On completion of your{" "}
                  <span className="text-white text-xl font-semibold bg-orange-800 rounded-full px-2">
                    20
                  </span>{" "}
                  assignments, you will receive a Surprise Gift
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
                  <span className=" flex items-center justify-end  md:h-32 ">
                    {/* <img
                      src={ZomatoImg}
                      alt="zomato pro"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    /> */}
                    <CustomSvg color="silver" text="III" />
                  </span>
                  <span className="bg-gray-500 rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg  ">
                    Silver III
                  </span>
                </h3>
                <p>
                  On completion of your first{" "}
                  <span className="text-white text-xl font-semibold bg-gray-500 rounded-full px-2">
                    100
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
                <p>
                  On completion of your first{" "}
                  <span className="text-white text-xl font-semibold bg-yellow-800 rounded-full px-2">
                    200
                  </span>{" "}
                  assignments, you will receive a pair of Sneakers.
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
                <p>
                  On completion of your first{" "}
                  <span className="text-white text-xl font-semibold bg-yellow-800 rounded-full px-2">
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
                  </span>
                </h3>
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
                  <span className=" flex items-center justify-end  md:h-32 ">
                    <img
                      src={TwoWheelerImg}
                      alt="two wheeler"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    />
                    <CustomSvg color="diamond" text="II" />
                  </span>
                  <span className="bg-blue141 rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg  ">
                    Diamond 2
                  </span>
                </h3>
                <p>
                  On completion of your first{" "}
                  <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                    200
                  </span>{" "}
                  assignments, you will receive a Two Wheeler.
                </p>
              </div>
            </div> */}

            {/* <img
                      src={LaptopImg}
                      alt="laptop"
                      className=" md:w-28 md:h-28 w-20 h-20  bg-cover  "
                    /> */}
            {/* <div className="card">
              <div className="info">
                <h3 className="title">
                  <span className=" flex items-center justify-start  md:h-32">
                    <CustomSvg color="diamond" text="III" />
                  </span>
                  <span className="bg-blue141 rounded-3xl  md:py-[0.5rem]  md:px-[1rem] p-1 text-center font-medium md:text-xl text-lg  ">
                    Diamond 3
                  </span>
                </h3>
                <p>
                  On completion of your first{" "}
                  <span className="text-white text-xl font-semibold bg-blue141 rounded-full px-2">
                    150
                  </span>{" "}
                  assignments, you will receive a Laptop.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
