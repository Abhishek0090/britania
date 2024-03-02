import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "~/utils/BaseURL";

export default function Marketing({ pageName }) {
  const [UTMParams, setUTMParams] = useState({});
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
      submit: "submit",
      data: {
        utm_data: {
          utm_source,
          utm_medium,
          utm_campaign,
          utm_content,
          utm_term,
          utm_id,
          page_name,
          page_url,
        },
        gcl_data: {
          gclid: params.get("gclid"),
        },
      },

      page_name: pageName,
    };
  }
  useEffect(() => {
    setUTMParams(getUTMParams());
  }, []);

  useEffect(() => {
    if (UTMParams?.data?.utm_data?.utm_source) {
      axios
        .post(
          `${URL}/student/marketingdata.php`,
          UTMParams
        )
        .then((res) => {
          console.log(res);
        });
    }
  }, []);
  return <></>;
}
