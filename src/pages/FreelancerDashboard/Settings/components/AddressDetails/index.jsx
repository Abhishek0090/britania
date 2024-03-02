import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";
import VuiButton from "~/components/VuiButton";
import VuiInput from "~/components/VuiInput";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import StreetviewIcon from "@mui/icons-material/Streetview";
import FlagIcon from "@mui/icons-material/Flag";
// Billing page components
import Invoice from "~/pages/FreelancerDashboard/Settings/components/Invoice";
import colors from "~/layout/SidebarLayout/theme/base/colors";
import RefreshIcon from "@mui/icons-material/Refresh";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CheckIcon from "@mui/icons-material/Check";
import { URL } from "~/utils/BaseURL";
import { Close } from "@mui/icons-material";

export default function AddressDetails({ user }) {
  const { grey } = colors;
  const [editParams, setEditParams] = useState({
    address: user?.address,
    street: user?.street,
    city: user?.city,
    state: user?.state,
  });
  const [loadingEdit, setLoadingEdit] = useState({
    address: false,
    street: false,
    city: false,
    state: false,
  });
  const [edit, setEdit] = useState({
    address: false,
    street: false,
    city: false,
    state: false,
  });

  const handleEdit = (name) => {
    setEdit((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  useEffect(() => {
    if (user)
      setEditParams({
        address: user?.address,
        street: user?.street,
        city: user?.city,
        state: user?.state,
      });
  }, [user]);

  const handleEditAddress = async () => {
    setLoadingEdit((prev) => ({ ...prev, address: true }));
    try {
      const { data } = await axios.post(`${URL}/freelancer/editaddress.php`, {
        freelancer_id: user?.id,
        address: editParams?.address,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, address: false }));
        setLoadingEdit((prev) => ({ ...prev, address: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, address: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, address: false }));
    }
  };

  const handleEditStreet = async () => {
    setLoadingEdit((prev) => ({ ...prev, street: true }));
    try {
      const { data } = await axios.post(`${URL}/freelancer/editstreet.php`, {
        freelancer_id: user?.id,
        street: editParams?.street,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, street: false }));
        setLoadingEdit((prev) => ({ ...prev, street: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, street: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, street: false }));
    }
  };

  const handleEditCity = async () => {
    setLoadingEdit((prev) => ({ ...prev, city: true }));
    try {
      const { data } = await axios.post(`${URL}/freelancer/editcity.php`, {
        freelancer_id: user?.id,
        city: editParams?.city,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, city: false }));
        setLoadingEdit((prev) => ({ ...prev, city: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, city: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, city: false }));
    }
  };

  const handleEditState = async () => {
    setLoadingEdit((prev) => ({ ...prev, state: true }));
    try {
      const { data } = await axios.post(`${URL}/freelancer/editstate.php`, {
        freelancer_id: user?.id,
        state: editParams?.state,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, state: false }));
        setLoadingEdit((prev) => ({ ...prev, state: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, state: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, state: false }));
    }
  };
  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
      <VuiBox
        mb="28px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <VuiTypography variant="lg" fontWeight="medium" color="white">
          Address Details
        </VuiTypography>
        {/* <VuiButton variant="contained" color="info" size="small">
          SAVE ALL
        </VuiButton> */}
      </VuiBox>
      <VuiBox>
        <VuiBox
          component="ul"
          display="flex"
          flexDirection="column"
          className="gap-4"
          p={0}
          m={0}
        >
          <VuiBox
            border="2px solid"
            borderRadius="20px"
            borderColor={grey[600]}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="22px 20px"
          >
            {edit?.address ? (
              <VuiInput
                p="22px 20px"
                placeholder="Address"
                value={editParams?.address}
                onChange={(e) =>
                  setEditParams((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                sx={{
                  "& input": {
                    color: "white",
                  },
                }}
              />
            ) : (
              <>
                <LocationOnIcon />
                <VuiTypography
                  pl={2}
                  variant="button"
                  color="white"
                  fontWeight="medium"
                >
                  {editParams?.address}
                </VuiTypography>
              </>
            )}

            <VuiBox ml="auto" lineHeight={0}>
              {edit.address ? (
                <>
                  {loadingEdit.address ? (
                    <Icon
                      sx={{ cursor: "pointer", color: "#fff" }}
                      fontSize="small"
                    >
                      <RefreshIcon className="animate-spin" />
                    </Icon>
                  ) : (
                    <div className="flex gap-4 p-2">
                      <Tooltip title="Save" placement="top">
                        <Icon
                          onClick={() => handleEditAddress()}
                          sx={{
                            cursor: "pointer",
                            background: "green",
                            borderRadius: "50%",
                            color: "#ffff",
                          }}
                          fontSize="small"
                        >
                          <CheckIcon />
                        </Icon>
                      </Tooltip>

                      <Tooltip title="Close" placement="top">
                        <Icon
                          onClick={() => {
                            setEdit((prev) => ({ ...prev, address: false }));
                            setEditParams((prev) => ({
                              ...prev,
                              address: editParams.address,
                            }));
                          }}
                          sx={{
                            cursor: "pointer",
                            background: "red",
                            borderRadius: "50%",
                            color: "#ffff",
                          }}
                          fontSize="small"
                        >
                          <Close />
                        </Icon>
                      </Tooltip>
                    </div>
                  )}
                </>
              ) : (
                <Tooltip title="Edit Address" placement="top">
                  <Icon
                    onClick={() => handleEdit("address")}
                    sx={{ cursor: "pointer", color: "#fff" }}
                    fontSize="small"
                  >
                    <DriveFileRenameOutlineIcon />
                  </Icon>
                </Tooltip>
              )}
            </VuiBox>
          </VuiBox>
          <VuiBox
            border="2px solid"
            borderRadius="20px"
            borderColor={grey[600]}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="22px 20px"
          >
            {edit?.street ? (
              <VuiInput
                p="22px 20px"
                placeholder="Address"
                value={editParams?.street}
                onChange={(e) =>
                  setEditParams((prev) => ({
                    ...prev,
                    street: e.target.value,
                  }))
                }
                sx={{
                  "& input": {
                    color: "white",
                  },
                }}
              />
            ) : (
              <>
                <StreetviewIcon />
                <VuiTypography
                  pl={2}
                  variant="button"
                  color="white"
                  fontWeight="medium"
                >
                  {editParams?.street}
                </VuiTypography>
              </>
            )}

            <VuiBox ml="auto" lineHeight={0}>
              {edit.street ? (
                <>
                  {loadingEdit.street ? (
                    <Icon
                      sx={{ cursor: "pointer", color: "#fff" }}
                      fontSize="small"
                    >
                      <RefreshIcon className="animate-spin" />
                    </Icon>
                  ) : (
                    <div className="flex gap-4 p-2">
                      <Tooltip title="Save" placement="top">
                        <Icon
                          onClick={() => handleEditStreet()}
                          sx={{
                            cursor: "pointer",
                            background: "green",
                            borderRadius: "50%",
                            color: "#ffff",
                          }}
                          fontSize="small"
                        >
                          <CheckIcon />
                        </Icon>
                      </Tooltip>
                      <Tooltip title="Close" placement="top">
                        <Icon
                          onClick={() => {
                            setEdit((prev) => ({ ...prev, street: false }));
                            setEditParams((prev) => ({
                              ...prev,
                              street: editParams.street,
                            }));
                          }}
                          sx={{
                            cursor: "pointer",
                            background: "red",
                            borderRadius: "50%",
                            color: "#ffff",
                          }}
                          fontSize="small"
                        >
                          <Close />
                        </Icon>
                      </Tooltip>
                    </div>
                  )}
                </>
              ) : (
                <Tooltip title="Edit Street" placement="top">
                  <Icon
                    onClick={() => handleEdit("street")}
                    sx={{ cursor: "pointer", color: "#fff" }}
                    fontSize="small"
                  >
                    <DriveFileRenameOutlineIcon />
                  </Icon>
                </Tooltip>
              )}
            </VuiBox>
          </VuiBox>
          <VuiBox
            border="2px solid"
            borderRadius="20px"
            borderColor={grey[600]}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="22px 20px"
          >
            {edit?.city ? (
              <VuiInput
                p="22px 20px"
                placeholder="City"
                value={editParams?.city}
                onChange={(e) =>
                  setEditParams((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                sx={{
                  "& input": {
                    color: "white",
                  },
                }}
              />
            ) : (
              <>
                <LocationCityIcon />
                <VuiTypography
                  pl={2}
                  variant="button"
                  color="white"
                  fontWeight="medium"
                >
                  {editParams?.city}
                </VuiTypography>
              </>
            )}

            <VuiBox ml="auto" lineHeight={0}>
              {edit.city ? (
                <>
                  {loadingEdit.city ? (
                    <Icon
                      sx={{ cursor: "pointer", color: "#fff" }}
                      fontSize="small"
                    >
                      <RefreshIcon className="animate-spin" />
                    </Icon>
                  ) : (
                    <div className="flex gap-4 p-2">
                      <Tooltip title="Save" placement="top">
                        <Icon
                          onClick={() => handleEditCity()}
                          sx={{
                            cursor: "pointer",
                            background: "green",
                            borderRadius: "50%",
                            color: "#ffff",
                          }}
                          fontSize="small"
                        >
                          <CheckIcon />
                        </Icon>
                      </Tooltip>
                      <Tooltip title="Close" placement="top">
                        <Icon
                          onClick={() => {
                            setEdit((prev) => ({ ...prev, city: false }));
                            setEditParams((prev) => ({
                              ...prev,
                              city: editParams.city,
                            }));
                          }}
                          sx={{
                            cursor: "pointer",
                            background: "red",
                            borderRadius: "50%",
                            color: "#ffff",
                          }}
                          fontSize="small"
                        >
                          <Close />
                        </Icon>
                      </Tooltip>
                    </div>
                  )}
                </>
              ) : (
                <Tooltip title="Edit City" placement="top">
                  <Icon
                    onClick={() => handleEdit("city")}
                    sx={{ cursor: "pointer", color: "#fff" }}
                    fontSize="small"
                  >
                    <DriveFileRenameOutlineIcon />
                  </Icon>
                </Tooltip>
              )}
            </VuiBox>
          </VuiBox>

          <VuiBox
            border="2px solid"
            borderRadius="20px"
            borderColor={grey[600]}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="22px 20px"
          >
            {edit?.state ? (
              <VuiInput
                p="22px 20px"
                placeholder="State"
                value={editParams?.state}
                onChange={(e) =>
                  setEditParams((prev) => ({
                    ...prev,
                    state: e.target.value,
                  }))
                }
                sx={{
                  "& input": {
                    color: "white",
                  },
                }}
              />
            ) : (
              <>
                <FlagIcon />
                <VuiTypography
                  pl={2}
                  variant="button"
                  color="white"
                  fontWeight="medium"
                >
                  {editParams?.state}
                </VuiTypography>
              </>
            )}

            <VuiBox ml="auto" lineHeight={0}>
              {edit.state ? (
                <>
                  {loadingEdit.state ? (
                    <Icon
                      sx={{ cursor: "pointer", color: "#fff" }}
                      fontSize="small"
                    >
                      <RefreshIcon className="animate-spin" />
                    </Icon>
                  ) : (
                    <div className="flex gap-4 p-2">
                      <Tooltip title="Save" placement="top">
                        <Icon
                          onClick={() => handleEditState()}
                          sx={{
                            cursor: "pointer",
                            background: "green",
                            borderRadius: "50%",
                            color: "#ffff",
                          }}
                          fontSize="small"
                        >
                          <CheckIcon />
                        </Icon>
                      </Tooltip>
                      <Tooltip title="Close" placement="top">
                        <Icon
                          onClick={() => {
                            setEdit((prev) => ({ ...prev, state: false }));
                            setEditParams((prev) => ({
                              ...prev,
                              state: editParams.state,
                            }));
                          }}
                          sx={{
                            cursor: "pointer",
                            background: "red",
                            borderRadius: "50%",
                            color: "#ffff",
                          }}
                          fontSize="small"
                        >
                          <Close />
                        </Icon>
                      </Tooltip>
                    </div>
                  )}
                </>
              ) : (
                <Tooltip title="Edit State" placement="top">
                  <Icon
                    onClick={() => handleEdit("state")}
                    sx={{ cursor: "pointer", color: "#fff" }}
                    fontSize="small"
                  >
                    <DriveFileRenameOutlineIcon />
                  </Icon>
                </Tooltip>
              )}
            </VuiBox>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}
