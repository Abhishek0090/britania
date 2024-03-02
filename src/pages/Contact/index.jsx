import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Marketing from "~/utils/Marketing";
import { LucideFacebook, LucideInstagram, LucideLinkedin } from "lucide-react";
import TelegramIcon from "@mui/icons-material/Telegram";
import { URL } from "~/utils/BaseURL";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [UTMParams, setUTMParams] = useState({});

  // TODO: Url params for UTM tracking
  function getUTMParams() {
    let params = new URLSearchParams(window.location.search);

    let utm_source = params.get("utm_source");
    let utm_medium = params.get("utm_medium");
    let utm_campaign = params.get("utm_campaign");
    let utm_content = params.get("utm_content");
    let utm_term = params.get("utm_term");
    let utm_id = params.get("utm_id");
    let page_name = params.get("page_name");

    let page_url = window.location.href;

    return {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      utm_id,
      page_name,
      page_url,
      gclid: params.get("gclid"),
    };
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      message: Yup.string().required("Message is required"),
    }),

    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      let data = {
        submit: "submit",
        name: values?.name,
        email: values?.email,
        message: values?.message,
        utm_data: UTMParams,
      };

      axios
        .post(`${URL}/student/contact.php`, data)
        .then((response) => {
          console.log(response);
          if (response?.data?.status === 200)
            toast.success(response?.data?.message);
          else toast.error(response?.data?.message);
          setLoading(false);
          resetForm({});
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast.error("Something went wrong");
        });
    },
  });

  //TODO: Formik Blur function to show error toast

  const handleFormBlur = (fieldName) => {
    if (formik.errors[fieldName]) {
      toast.error(formik.errors[fieldName]);
      return;
    }
    formik.setFieldValue(fieldName, formik.values[fieldName]);
  };

  useEffect(() => {
    setUTMParams(getUTMParams());
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact | Bluepen</title>
      </Helmet>
      <Marketing pageName="Contact" />
      <div>
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80"
          alt="..."
          className=" w-full object-cover absolute h-screen opacity-20"
        />
      </div>
      <div className="flex  justify-center items-center w-screen  bg-white">
        <div className="container md:py-20  py-10 mx-auto  px-4 lg:px-20">
          <form
            style={{
              backdropFilter: "blur(20px)",
            }}
            method="POST"
            onSubmit={formik.handleSubmit}
            className="w-full p-8  my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto shadow-2xl rounded-3xl"
          >
            <div className="flex">
              <h1 className="font-bold uppercase md:text-5xl text-3xl">
                Contact Us
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
              <input
                className="w-full bg-gray-100 text-blue141 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                required
                placeholder="Name*"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={() => handleFormBlur("name")}
              />
              <input
                className="w-full bg-gray-100 text-blue141 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                required
                placeholder="Email*"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={() => handleFormBlur("email")}
              />
            </div>
            <div className="my-4">
              <textarea
                id="message"
                name="message"
                required
                placeholder="Message*"
                className="w-full h-32 bg-gray-100 text-blue141 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={() => handleFormBlur("message")}
              ></textarea>
            </div>
            <div className="my-2 w-full  flex items-center flex-col md:flex-row justify-center">
              {/* <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                ref={captchaRef}
                onChange={(value) => {
                  toast.success('You are not a robot', value);
                  setIsDisabled(false);
                }}
              /> */}

              <LoadingButton
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<TelegramIcon />}
                loading={loading}
                disabled={
                  loading ||
                  !formik.isValid ||
                  !formik.values.name ||
                  !formik.values.email ||
                  !formik.values.message
                }
                sx={{
                  bgcolor: "#2956A8",
                  color: "#fff",
                  mt: 2,
                  py: 2,
                  width: "38ch",
                  borderRadius: "1000px",

                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#000",
                  },
                }}
              >
                Send Message
              </LoadingButton>
            </div>
          </form>

          <div
            style={{
              backdropFilter: "blur(20px)",
            }}
            className="w-full  lg:-mt-96 lg:w-2/6 px-8 py-8 ml-auto bg-black999 shadow-2xl rounded-2xl"
          >
            <div className="flex flex-col text-white">
              <div className="flex my-4 w-full">
                <div className="flex flex-col px-2">
                  <h2 className="text-2xl">Main Office</h2>
                  <p className="text-gray-400">
                    4th Floor, Office No. 4008 & 4009, Bhandup Industrial Estate
                    Co-Operative Society LTD, L.B.S Marg, Bhandup(West) Mumbai, Mumbai, Mumbai, Maharashtra, India - 400078
                  </p>
                </div>
              </div>

              <p className="flex my-4 w-full ">
                <div className="flex flex-col gap-1 px-2">
                  <h2 className="text-2xl">Call Us</h2>
                  <a className="text-gray-400" href="tel:+91 90041 85304">
                    Tel: +91  90041 85304{" "}
                  </a>
                  <p className="text-gray-400">or </p>
                  <a className="text-gray-400" href="tel:+91 98922 51891">
                    Tel: +91  98922 51891{" "}
                  </a>
                  <p className="text-gray-400">or </p>
                  <a className="text-gray-400" href="tel:+91 96193 05482">
                    Tel: +91  96193 05482{" "}
                  </a>
                  <h2 className="text-lg text-gray-300">
                    {" "}
                    If you are not able to contact , whatsapp us{" "}
                  </h2>
                </div>
              </p>
              <a
                className="flex my-4 w-full "
                href="mailto:contact@bluepen.co.in "
              >
                <div className="flex flex-col px-2">
                  <h2 className="text-2xl">Mail Us</h2>
                  <p className="text-gray-400">Email: contact@bluepen.co.in </p>
                </div>
              </a>

              <div className="flex my-4 w-2/3 lg:w-1/2">
                <div className="mt-6 lg:mb-0 mb-6">
                  <button
                    onClick={() => {
                      window.open(
                        "https://www.instagram.com/bluepen.co.in",
                        "_blank"
                      );
                    }}
                    className="  shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                  >
                    <LucideInstagram />
                  </button>
                  <button
                    onClick={() => {
                      window.open(
                        "https://www.linkedin.com/company/bluepen-co-in",
                        "_blank"
                      );
                    }}
                    className="  shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                  >
                    <LucideLinkedin />
                  </button>
                  <button
                    onClick={() => {
                      window.open(
                        "https://wa.me/919174117419?text=Hey%2C+I+wanted+to+inquire+about+an+assignment%2Fproject.+The+details+are+++ ",
                        "_blank"
                      );
                    }}
                    className="  shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24px"
                      height="24px"
                      fill="#fff"
                    >
                      {" "}
                      <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.9369840784448!2d72.9355831!3d19.154235499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9a67d56bd8b%3A0x38ad76830fccbe4c!2sBluePen!5e0!3m2!1sen!2sin!4v1673945745879!5m2!1sen!2sin"
        width="100%"
        height="600"
        className=" relative rounded-2xl shadow-2xl top-0 left-0"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
}
