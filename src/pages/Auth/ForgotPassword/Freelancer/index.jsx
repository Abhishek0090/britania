/* eslint-disable no-undef */
import React, { useState } from "react"; 
import { useFormik } from "formik";
import toast from "react-hot-toast"; 
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import LoadingButton from "@mui/lab/LoadingButton";
import "react-phone-input-2/lib/bootstrap.css";
import { URL } from "~/utils/BaseURL";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

//Form schema
const formSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function ForgotPassword() { 
  const [loading, setLoading] = useState(false); 

  const [link, setLink] = useState({
    et: null,
    item: null,
  });

  //formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => { 
      console.log(values);

      await axios
        .post(`${URL}/freelancer/generatesalt.php`, values)
        .then((res) => {
          console.log(res.data.time);
          console.log(res.data.item);
          if (res.data.status === "success") {
            toast.success(res.data.message);
            setLink((prev) => ({
              ...prev,
              et: res.data.time,
              item: res.data.item,
            }));

            console.log(link);

            const converted = JSON.stringify(link);
            console.log(converted);
            localStorage.setItem("link", converted);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validationSchema: formSchema,
  });
  console.log(
    `http://localhost:3000/auth/changepasswordfreelancer?et=${link.et}&item=${link.item}`
  );
  return (
    <>
      <div className="max-w-3xl py-10 mx-auto shadow-2xl backdrop-blur-2xl drop-shadow rounded-xl md:my-10">
        <div className="flex flex-col justify-center mx-auto text-center ">
          <div className="w-full ">
            <Typography
              align="center"
              variant="h3"
              fontWeight="bold"
              gutterBottom
            >
              Forgot Password
            </Typography>
            <div className="flex flex-col items-center">
              <form onSubmit={formik.handleSubmit}>
                {/* display err */}

                <div className="flex flex-col items-center md:flex-row">
                  <div className="flex flex-col items-center ">
                    <FormControl
                      sx={{ m: 1, width: "34ch" }}
                      variant="outlined"
                      required
                    >
                      <InputLabel htmlFor="outlined-adornment-email">
                        Email
                      </InputLabel>
                      <OutlinedInput
                        required
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="on"
                        label="Email"
                        sx={{ borderRadius: "1000px" }}
                        error={formik.errors.email && formik.touched.email}
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                      />
                    </FormControl>
                    {/* OTP Section */}
                  </div>
                </div>

                <LoadingButton
                  loading={loading}
                  disabled={formik.errors.email}
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
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
                  Submit
                </LoadingButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
