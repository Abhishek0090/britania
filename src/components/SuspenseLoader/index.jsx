import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Logo from "~/assets/logo/bluepen.webp";

export default function SuspenseLoader({
  text = "bluepen.co.in",
  delay = 0.01,
  duration = 0.1,
  ...props
}) {
  const letters = Array.from(text);
  const [replay, setReplay] = useState(false);

  useEffect(() => {
    // Decreased the interval duration for faster animation
    const interval = setInterval(() => {
      setReplay(!replay);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [replay]);

  // const container = {
  //   hidden: {
  //     opacity: 0,
  //   },
  //   visible: (i = 1) => ({
  //     opacity: 1,
  //     transition: { staggerChildren: duration, delayChildren: i * delay },
  //   }),
  // };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        duration: duration, // Adjusted duration for faster animation
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        duration: duration, // Adjusted duration for faster animation
      },
    },
  };

  return (
    <div className="overlay ">
      <div
        style={{
          display: "flex",
          overflow: "hidden",
        }}
        {...props}
      >
        <div className="word">
          {/* <img src={Logo} alt="logo" className="h-[50%] w-[50%]" /> */}
          {letters.map((letter, index) => (
            <div key={index} variants={child}>
              {letter === " " ? "\u00A0" : letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
