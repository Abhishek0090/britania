import { useNavigate } from 'react-router-dom';
import Reward from '~/components/Reward';
export default function FreelanceFormTwo() {
  const navigate = useNavigate();

  const nextHandler = () => {
    navigate('/freelance/step2');
  };

  return (
    <>
      {/* // heading  */}
      <div className="md:max-w-[90vw] md:mx-auto flex flex-col items-center my-5 py-5 md:py-20  px-10  mx-5  bg-white rounded-xl shadow-lg  bg-opacity-20 backdrop-blur-lg drop-shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 md:text-[3rem]">
          Wait a minute!
        </h1>
        <p className="text-blue141 tracking-wider text-sm md:text-xl font-medium text-center  pt-2 md:max-w-5xl ">
          Before you proceed, we would like to tell you why us, and why these
          rewards(mentioned below). We believe that relations matter the most
          for anything to last long. We at Bluepen want to go beyond the
          professional monetary relationship and extend our love and warmth for
          all the work that you do with us. Here is the list of chosen gifts
          that we are sure you’ll love and will also keep you motivated to see
          the bigger picture on this journey along with us.
        </p>

        <Reward color={'bg-[#]'} />
        <div className="flex sticky bottom-5 gap-5">
          <button
            onClick={nextHandler}
            className=" w-32 py-1 mt-5 text-lg text-white rounded-full bg-blue141 md:font-SemiBold md:text-2xl md:py-3 md:w-48 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate('/rewards-terms')}
            className=" w-32 py-1 mt-5 text-lg text-white rounded-full bg-blue141 md:font-SemiBold md:text-2xl md:py-3 md:w-48 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Rewards TnC
          </button>
        </div>
      </div>
    </>
  );
}
