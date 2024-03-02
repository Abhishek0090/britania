import axios from "axios";
import React, { useEffect } from "react";
import { URL } from "~/utils/BaseURL";
import SuspenseLoader from "~/components/SuspenseLoader";
import { useDispatch } from "react-redux";
import { setAllNonLoggedPlagiarismDetails } from "~/features/student/studentSlice";
import { useNavigate } from "react-router";

const Redirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const order_id = queryParams.get("order_id");

  const resultString = order_id.substring(2);
  console.log(resultString);

  useEffect(() => {
    axios
      .put(`${URL}/student/checkorderstatusplag.php`, {
        order_id: resultString,
      })
      .then((res) => {
        console.log(res);
        if (res?.data?.order_status === "PAID") {
          navigate("/submit/checkplagiarism/checkout/success");
        } else if (res?.data?.order_status === "ACTIVE") {
          dispatch(setAllNonLoggedPlagiarismDetails({ link: res.data?.link }));
          navigate("/submit/checkplagiarism/checkout/failure");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <SuspenseLoader />
    </>
  );
};

export default Redirect;
