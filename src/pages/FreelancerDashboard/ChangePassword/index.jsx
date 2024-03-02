import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Grid, Stack } from "@mui/material";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import VuiBox from "~/components/VuiBox";
import VuiInput from "~/components/VuiInput";
import LoadingButton from "@mui/lab/LoadingButton";
import VuiTypography from "~/components/VuiTypography";
import DashboardLayout from "~/layout/LayoutContainers/DashboardLayout";
import DashboardNavbar from "~/layout/Navbars/DashboardNavbar";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { URL } from "~/utils/BaseURL";

export default function ChangePassword() {
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const [loading, setLoading] = useState(false);
  //formik

  const validationSchema = Yup.object({
    old_password: Yup.string().required("Required"),
    new_password: Yup.string().required("Required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    onSubmit: (values) => {
      const data = {
        freelancer_id: auth?.id,
        old_password: values.old_password,
        new_password: values.new_password,
      };
      setLoading(true);
      axios.post(`${URL}/freelancer/changepassword.php`, data).then((res) => {
        // console.log('res', res);
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          setLoading(false);
          navigate("/dashboard/freelancer/dashboard");
        } else {
          setLoading(false);
          toast.error(res?.data?.message);
        }
      });
    },
    validationSchema: validationSchema,
  });

  return (
    <DashboardLayout>
      <Helmet>
        <title>Change Password | Bluepen</title>
      </Helmet>
      <div className="min-h-screen">
        <DashboardNavbar light />
        <VuiBox mt={5} mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} xl={8}>
              <Grid item xs={12} lg={12} xl={12}>
                <Card>
                  <VuiBox>
                    <VuiTypography
                      variant="lg"
                      color="white"
                      fontWeight="bold"
                      mb="5px"
                    >
                      Change Password
                    </VuiTypography>
                    <VuiBox display="flex" alignItems="center" mb="40px">
                      <VuiTypography
                        variant="button"
                        color="text"
                        fontWeight="regular"
                      >
                        You can change your password here
                      </VuiTypography>
                    </VuiBox>

                    <div className="flex flex-col justify-start items-start mx-4 ">
                      <form onSubmit={formik.handleSubmit}>
                        {/* display err */}

                        <div>
                          <label
                            for="old_password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Old Password
                          </label>
                          <VuiInput
                            type="password"
                            id="old_password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="*********"
                            required
                            value={formik.values.old_password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        <div>
                          <label
                            for="new_password"
                            className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            New Password
                          </label>
                          <VuiInput
                            type="password"
                            id="new_password"
                            className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="*********"
                            required
                            value={formik.values.new_password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        <div>
                          <label
                            for="confirm_password"
                            className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Confirm new Password
                          </label>
                          <VuiInput
                            type="text"
                            id="confirm_password"
                            className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="*********"
                            required
                            value={formik.values.confirm_password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>

                        <LoadingButton
                          loading={loading}
                          variant="contained"
                          color="primary"
                          type="submit"
                          startIcon={<PublishedWithChangesIcon />}
                          sx={{
                            bgcolor: "#141B41",
                            color: "#fff",
                            mt: 2,
                            py: 2,
                            width: "38ch",
                            borderRadius: "1000px",
                            "&.MuiButton-contained.Mui-disabled": {
                              backgroundColor: "#fff",
                              color: "#000",
                            },
                            "&:hover": {
                              backgroundColor: "#fff",
                              color: "#000",
                            },
                          }}
                        >
                          Change Password
                        </LoadingButton>
                      </form>
                    </div>
                  </VuiBox>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </VuiBox>
      </div>
    </DashboardLayout>
  );
}
