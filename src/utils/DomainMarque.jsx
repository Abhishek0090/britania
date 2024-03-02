import Slider from "react-slick";
export default function DomainMarque({ customStyles, ContentList , color }) {
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

  const ContentData = ContentList.map((item, i) => (
    <h2
      key={i}
      className={`text-base md:text-2xl   ${color} text-center md:px-2  `}
    >
      {item.name}
    </h2>
  ));

  return ( 
      <div className="flex flex-row items-center justify-center text-base md:text-2xl    text-white p-2">
        <Slider {...settings}>{ContentData}</Slider>
      </div> 
  );
}
