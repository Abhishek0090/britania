import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";
import VuiInput from "~/components/VuiInput";
import PersonIcon from "@mui/icons-material/Person";
// Images
import colors from "~/layout/SidebarLayout/theme/base/colors";
import RefreshIcon from "@mui/icons-material/Refresh";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CheckIcon from "@mui/icons-material/Check";
import { URL } from "~/utils/BaseURL";
import { Close } from "@mui/icons-material";

export default function BasicDetails({ user }) {
  const { grey } = colors;

  console.log(user);

  const [editParams, setEditParams] = useState({
    firstname: user?.firstname,
    lastname: user?.lastname,
  });

  const [loadingEdit, setLoadingEdit] = useState({
    firstname: false,
    lastname: false,
  });

  const [edit, setEdit] = useState({
    firstname: false,
    lastname: false,
  });

  const handleEdit = (name) => {
    setEdit((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  useEffect(() => {
    if (user)
      setEditParams({
        firstname: user?.firstname,
        lastname: user?.lastname,
      });
  }, [user]);

  const handleEditFirstname = async () => {
    setLoadingEdit((prev) => ({ ...prev, firstname: true }));
    try {
      const { data } = await axios.post(`${URL}/freelancer/editfirstname.php`, {
        freelancer_id: user?.id,
        first_name: editParams?.firstname,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, firstname: false }));
        setLoadingEdit((prev) => ({ ...prev, firstname: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, firstname: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, firstname: false }));
    }
  };

  const handleEditLastname = async () => {
    setLoadingEdit((prev) => ({ ...prev, lastname: true }));
    try {
      const { data } = await axios.post(`${URL}/freelancer/editlastname.php`, {
        freelancer_id: user?.id,
        last_name: editParams?.lastname,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setLoadingEdit((prev) => ({ ...prev, lastname: false }));
        setEdit((prev) => ({ ...prev, lastname: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, lastname: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, lastname: false }));
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
          Basic Details
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
              {edit?.firstname ? (
                <VuiInput
                  p="22px 20px"
                  placeholder="First Name"
                  value={editParams?.firstname}
                  onChange={(e) =>
                    setEditParams((prev) => ({
                      ...prev,
                      firstname: e.target.value,
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
                  <PersonIcon />
                  <VuiTypography
                    pl={2}
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    {editParams?.firstname}
                  </VuiTypography>
                </>
              )}

              <VuiBox ml="auto" lineHeight={0}>
                {edit.firstname ? (
                  <>
                    {loadingEdit.firstname ? (
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
                            onClick={() => handleEditFirstname()}
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
                              setEdit((prev) => ({
                                ...prev,
                                firstname: false,
                              }));
                              setEditParams((prev) => ({
                                ...prev,
                                firstname: editParams.firstname,
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
                  <Tooltip title="Edit First Name" placement="top">
                    <Icon
                      onClick={() => handleEdit("firstname")}
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
              {edit?.lastname ? (
                <VuiInput
                  p="22px 20px"
                  placeholder="Last Name"
                  value={editParams?.lastname}
                  onChange={(e) =>
                    setEditParams((prev) => ({
                      ...prev,
                      lastname: e.target.value,
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
                  <PersonIcon />
                  <VuiTypography
                    pl={2}
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    {editParams?.lastname}
                  </VuiTypography>
                </>
              )}

              <VuiBox ml="auto" lineHeight={0}>
                {edit.lastname ? (
                  <>
                    {loadingEdit.lastname ? (
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
                            onClick={() => handleEditLastname()}
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
                              setEdit((prev) => ({ ...prev, lastname: false }));
                              setEditParams((prev) => ({
                                ...prev,
                                lastname: editParams.lastname,
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
                  <Tooltip title="Edit Last Name" placement="top">
                    <Icon
                      onClick={() => handleEdit("lastname")}
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
