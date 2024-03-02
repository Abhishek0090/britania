import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";
import VuiInput from "~/components/VuiInput";

import axios from "axios";
import toast from "react-hot-toast";
import { URL } from "~/utils/BaseURL";

// Images
import colors from "~/layout/SidebarLayout/theme/base/colors";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import FiberPinIcon from "@mui/icons-material/FiberPin";
import RefreshIcon from "@mui/icons-material/Refresh";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CheckIcon from "@mui/icons-material/Check";
import { Close } from "@mui/icons-material";

export default function SpecificDetails({ user }) {
  const { grey } = colors;
  const [anchorEl, setAnchorEl] = useState(null);
  const [editParams, setEditParams] = useState({
    gender: user?.gender,
    pincode: user?.pincode,
  });

  const [loadingEdit, setLoadingEdit] = useState({
    gender: false,
    pincode: false,
  });
  const [edit, setEdit] = useState({
    gender: false,
    pincode: false,
  });

  const handleEdit = (name) => {
    setEdit((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (user)
      setEditParams({
        gender: user?.gender,
        pincode: user?.pincode,
      });
  }, [user]);

  const handleChageGender = async (gender) => {
    handleClose();
    setLoadingEdit((prev) => ({ ...prev, gender: true }));
    try {
      const { data } = await axios.post(`${URL}/freelancer/editgender.php`, {
        freelancer_id: user?.id,
        gender: editParams.gender,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, gender: false }));
        setLoadingEdit((prev) => ({ ...prev, gender: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, gender: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, gender: false }));
    }
  };

  const handleChagePincode = async () => {
    setLoadingEdit((prev) => ({ ...prev, pincode: true }));
    try {
      const { data } = await axios.post(`${URL}/freelancer/editpincode.php`, {
        freelancer_id: user?.id,
        pincode: editParams?.pincode,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, pincode: false }));
        setLoadingEdit((prev) => ({ ...prev, pincode: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, pincode: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, pincode: false }));
    }
  };

  return (
    <Card id="delete-account">
      <VuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="32px"
      >
        <VuiTypography variant="lg" fontWeight="bold" color="white">
          Specific Details
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <VuiBox
              border="2px solid"
              borderRadius="20px"
              borderColor={grey[600]}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="22px 20px"
            >
              {editParams?.gender === "Male" ? <MaleIcon /> : <FemaleIcon />}
              {edit.gender ? (
                <VuiTypography
                  pl={2}
                  variant="button"
                  color="white"
                  fontWeight="medium"
                >
                  {edit.gender ? (
                    <div className="flex gap-6">
                      <div class="flex gap-4">
                        <div class="inline-flex items-center">
                          <label
                            class="relative flex cursor-pointer items-center rounded-full p-3"
                            for="html"
                            data-ripple-dark="true"
                          >
                            <input
                              id="html"
                              name="type"
                              type="radio"
                              value="Male"
                              onChange={(e) =>
                                setEditParams((prev) => ({
                                  ...prev,
                                  gender: e.target.value,
                                }))
                              }
                              checked={editParams.gender === "Male"}
                              class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-blue-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                            />
                            <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3.5 w-3.5"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <circle
                                  data-name="ellipse"
                                  cx="8"
                                  cy="8"
                                  r="8"
                                ></circle>
                              </svg>
                            </div>
                          </label>
                          <label
                            class="mt-px cursor-pointer select-none font-bold text-white"
                            for="html"
                          >
                            Male
                          </label>
                        </div>
                        <div class="inline-flex items-center">
                          <label
                            class="relative flex cursor-pointer items-center rounded-full p-3"
                            for="react"
                            data-ripple-dark="true"
                          >
                            <input
                              id="react"
                              name="type"
                              type="radio"
                              value="Female"
                              onChange={(e) =>
                                setEditParams((prev) => ({
                                  ...prev,
                                  gender: e.target.value,
                                }))
                              }
                              checked={editParams.gender === "Female"}
                              class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-blue-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                            />
                            <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3.5 w-3.5"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <circle
                                  data-name="ellipse"
                                  cx="8"
                                  cy="8"
                                  r="8"
                                ></circle>
                              </svg>
                            </div>
                          </label>
                          <label
                            class="mt-px cursor-pointer select-none font-bold text-white"
                            for="react"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                      {/* <label className="font-bold flex gap-4 cursor-pointer items-center text-[17px]">
                        <input
                          type="radio"
                          className="cursor-pointer"
                          value="Male"
                          onChange={(e) =>
                            setEditParams((prev) => ({
                              ...prev,
                              gender: e.target.value,
                            }))
                          }
                          checked={editParams.gender === "Male"}
                        />
                        Male
                      </label> */}
                      {/* <label className="font-bold flex gap-4 items-center cursor-pointer text-[17px]">
                        <input
                          type="radio"
                          className="cursor-pointer"
                          value="Female"
                          onChange={(e) =>
                            setEditParams((prev) => ({
                              ...prev,
                              gender: e.target.value,
                            }))
                          }
                          checked={editParams.gender === "Female"}
                        />
                        Female
                      </label> */}
                    </div>
                  ) : null}
                </VuiTypography>
              ) : (
                <VuiTypography
                  pl={2}
                  variant="button"
                  color="white"
                  fontWeight="medium"
                >
                  {editParams?.gender}
                </VuiTypography>
              )}

              <VuiBox ml="auto" lineHeight={0}>
                {edit.gender ? (
                  <>
                    {loadingEdit.gender ? (
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
                            onClick={() => {
                              setEdit((prev) => ({ ...prev, gender: true }));
                              handleChageGender();
                            }}
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
                              setEdit((prev) => ({ ...prev, gender: false }));
                              setEditParams((prev) => ({
                                ...prev,
                                gender: editParams.gender,
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
                  <Tooltip title="Edit Gender" placement="top">
                    <Icon
                      onClick={() => handleEdit("gender")}
                      sx={{ cursor: "pointer", color: "#fff" }}
                      fontSize="small"
                    >
                      <DriveFileRenameOutlineIcon />
                    </Icon>
                  </Tooltip>
                )}
              </VuiBox>
            </VuiBox>
          </Grid>
          <Grid item xs={12} md={12}>
            <VuiBox
              border="2px solid"
              borderRadius="20px"
              borderColor={grey[600]}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="22px 20px"
            >
              {edit?.pincode ? (
                <input
                  className="appearance:none bg-[#0f1535] outline:none text-[#ffff] focus:outline text-[16px] border-2 border-gray-700 rounded-xl p-1 w-full"
                  p="22px 20px"
                  type="text"
                  maxLength="6"
                  placeholder="Pincode"
                  value={editParams?.pincode}
                  onChange={(e) =>
                    setEditParams((prev) => ({
                      ...prev,
                      pincode: e.target.value,
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
                  <FiberPinIcon />
                  <VuiTypography
                    pl={2}
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    {editParams?.pincode}
                  </VuiTypography>
                </>
              )}

              <VuiBox ml="auto" lineHeight={0}>
                {edit.pincode ? (
                  <>
                    {loadingEdit.pincode ? (
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
                            onClick={() => handleChagePincode()}
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
                              setEdit((prev) => ({ ...prev, pincode: false }));
                              setEditParams((prev) => ({
                                ...prev,
                                pincode: editParams.pincode,
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
                  <Tooltip title="Edit PinCode" placement="top">
                    <Icon
                      onClick={() => handleEdit("pincode")}
                      sx={{ cursor: "pointer", color: "#fff" }}
                      fontSize="small"
                    >
                      <DriveFileRenameOutlineIcon />
                    </Icon>
                  </Tooltip>
                )}
              </VuiBox>
            </VuiBox>
          </Grid>
        </Grid>
      </VuiBox>
    </Card>
  );
}
