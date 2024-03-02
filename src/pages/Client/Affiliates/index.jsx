import React from "react";
import { useState, useEffect } from "react";
import AffiliatesTable from "./AffiliatesTable";
import PieChart from "./PieChart";
import GraphData from "./GraphData";
import axios from "axios";
import { URL } from "~/utils/BaseURL";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";

const Referrals = () => {
  const [affiliateData, setAffiliateData] = useState([]);
  const auth = useSelector(selectAuth);

  useEffect(() => {
    axios
      .post(`${URL}/student/getassignmentaffiliate.php`, { token: auth?.token })
      .then((res) => setAffiliateData(res?.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(affiliateData);

  return (
    <div className="pt-5 pb-10 px-5">
      {/* <div className="flex  items-center justify-center m-auto">
        <GraphData />
      </div> */}
      <h2 className="text-xl text-center py-10 md:text-5xl font-bold">
        Affiliate Data
      </h2>
      <div>
        <AffiliatesTable cryptoOrders={affiliateData} />
      </div>
    </div>
  );
};

export default Referrals;
