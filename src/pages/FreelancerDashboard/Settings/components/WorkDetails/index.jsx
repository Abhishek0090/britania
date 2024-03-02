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
// Images
import colors from "~/layout/SidebarLayout/theme/base/colors";
import RefreshIcon from "@mui/icons-material/Refresh";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CheckIcon from "@mui/icons-material/Check";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BadgeIcon from "@mui/icons-material/Badge";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LinkIcon from "@mui/icons-material/Link";
import { URL } from "~/utils/BaseURL";
import { Close } from "@mui/icons-material";

const linkRegex =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

export default function WorkDetails({ user, work }) {
  const { grey } = colors;

  const [editParams, setEditParams] = useState({
    qualification: work?.qualification,
    experience: work?.experience,
    past_experience: work?.past_experience,
    working_hours: work?.working_hours,
    work_links: work?.work_links,
  });

  const [loadingEdit, setLoadingEdit] = useState({
    qualification: false,
    experience: false,
    past_experience: false,
    working_hours: false,
    work_links: false,
  });

  const [edit, setEdit] = useState({
    qualification: false,
    experience: false,
    past_experience: false,
    working_hours: false,
    work_links: false,
  });

  const handleEdit = (name) => {
    setEdit((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  useEffect(() => {
    if (work)
      setEditParams({
        qualification: work?.qualification,
        experience: work?.experience,
        past_experience: work?.past_experience,
        working_hours: work?.working_hours,
        work_links: work?.work_links,
      });
  }, [work]);

  const handleEditQualification = async () => {
    setLoadingEdit((prev) => ({ ...prev, qualification: true }));
    try {
      const { data } = await axios.post(
        `${URL}/freelancer/editqualification.php`,
        {
          freelancer_id: user?.id,
          qualification: editParams?.qualification,
        }
      );
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, qualification: false }));
        setLoadingEdit((prev) => ({ ...prev, qualification: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, qualification: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, qualification: false }));
    }
  };

  const handleEditExperience = async () => {
    setLoadingEdit((prev) => ({ ...prev, experience: true }));
    try {
      const { data } = await axios.post(
        `${URL}/freelancer/editexperience.php`,
        {
          freelancer_id: user?.id,
          experience: editParams?.experience,
        }
      );
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, experience: false }));
        setLoadingEdit((prev) => ({ ...prev, experience: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, experience: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, experience: false }));
    }
  };

  const handleEditPastExp = async () => {
    setLoadingEdit((prev) => ({ ...prev, past_experience: true }));
    try {
      const { data } = await axios.post(
        `${URL}/freelancer/editpastexperience.php`,
        {
          freelancer_id: user?.id,
          past_experience: editParams?.past_experience,
        }
      );
      if (data?.status === 200) {
        toast.success(data?.message);
        setLoadingEdit((prev) => ({ ...prev, past_experience: false }));
        setEdit((prev) => ({ ...prev, past_experience: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, past_experience: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, past_experience: false }));
    }
  };

  const handleEditWorkHours = async () => {
    setLoadingEdit((prev) => ({ ...prev, working_hours: true }));
    try {
      const { data } = await axios.post(
        `${URL}/freelancer/editworkinghours.php`,
        {
          freelancer_id: user?.id,
          working_hours: editParams?.working_hours,
        }
      );
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, working_hours: false }));
        setLoadingEdit((prev) => ({ ...prev, working_hours: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, working_hours: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, working_hours: false }));
    }
  };

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    setEditParams((prevParams) => ({
      ...prevParams,
      work_links: inputValue,
    }));
  };
  const handleEditWorksLinks = async () => {
    setLoadingEdit((prev) => ({ ...prev, work_links: true }));

    if (
      !linkRegex.test(editParams.work_links) ||
      editParams.work_links === ""
    ) {
      toast.error("Please enter a valid URL.");
      setEdit((prev) => ({ ...prev, work_links: false }));
      setEditParams((prev) => ({ ...prev, work_links: work?.work_links }));
      setLoadingEdit((prev) => ({ ...prev, work_links: false }));
      return;
    }
    try {
      const { data } = await axios.post(`${URL}/freelancer/editworklinks.php`, {
        freelancer_id: user?.id,
        work_links: editParams?.work_links,
      });
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, work_links: false }));
        setLoadingEdit((prev) => ({ ...prev, work_links: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, work_links: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, work_links: false }));
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
          Your Work Details
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <VuiTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              textTransform="uppercase"
            >
              Qualification
            </VuiTypography>
            <VuiBox
              border="2px solid"
              borderRadius="20px"
              borderColor={grey[600]}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="22px 20px"
            >
              {edit?.qualification ? (
                <VuiInput
                  p="22px 20px"
                  placeholder="Qualification"
                  value={editParams?.qualification}
                  onChange={(e) =>
                    setEditParams((prev) => ({
                      ...prev,
                      qualification: e.target.value,
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
                  <SchoolIcon />
                  <VuiTypography
                    pl={2}
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    {editParams?.qualification}
                  </VuiTypography>
                </>
              )}

              <VuiBox ml="auto" lineHeight={0}>
                {edit.qualification ? (
                  <>
                    {loadingEdit.qualification ? (
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
                            onClick={() => handleEditQualification()}
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
                                qualification: false,
                              }));
                              setEditParams((prev) => ({
                                ...prev,
                                qualification: editParams.qualification,
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
                  <Tooltip title="Edit Qualification" placement="top">
                    <Icon
                      onClick={() => handleEdit("qualification")}
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
            <VuiTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              textTransform="uppercase"
            >
              Experience
            </VuiTypography>
            <VuiBox
              border="2px solid"
              borderRadius="20px"
              borderColor={grey[600]}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="22px 20px"
            >
              {edit?.experience ? (
                <VuiInput
                  p="22px 20px"
                  placeholder="Experience"
                  value={editParams?.experience}
                  onChange={(e) =>
                    setEditParams((prev) => ({
                      ...prev,
                      experience: e.target.value,
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
                  <AssignmentIndIcon />
                  <VuiTypography
                    pl={2}
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    {editParams?.experience}
                  </VuiTypography>
                </>
              )}

              <VuiBox ml="auto" lineHeight={0}>
                {edit.experience ? (
                  <>
                    {loadingEdit.experience ? (
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
                            onClick={() => handleEditExperience()}
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
                                experience: false,
                              }));
                              setEditParams((prev) => ({
                                ...prev,
                                experience: editParams.experience,
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
                  <Tooltip title="Edit Experience" placement="top">
                    <Icon
                      onClick={() => handleEdit("experience")}
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
            <VuiTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              textTransform="uppercase"
            >
              Past Experience
            </VuiTypography>
            <VuiBox
              border="2px solid"
              borderRadius="20px"
              borderColor={grey[600]}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="22px 20px"
            >
              {edit?.past_experience ? (
                <VuiInput
                  p="22px 20px"
                  placeholder="Past Experience"
                  value={editParams?.past_experience}
                  onChange={(e) =>
                    setEditParams((prev) => ({
                      ...prev,
                      past_experience: e.target.value,
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
                  <BadgeIcon />
                  <VuiTypography
                    pl={2}
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    {editParams?.past_experience}
                  </VuiTypography>
                </>
              )}

              <VuiBox ml="auto" lineHeight={0}>
                {edit.past_experience ? (
                  <>
                    {loadingEdit.past_experience ? (
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
                            onClick={() => handleEditPastExp()}
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
                                past_experience: false,
                              }));
                              setEditParams((prev) => ({
                                ...prev,
                                past_experience: editParams.past_experience,
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
                  <Tooltip title="Edit Past Experience" placement="top">
                    <Icon
                      onClick={() => handleEdit("past_experience")}
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
            <VuiTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              textTransform="uppercase"
            >
              Working Hours
            </VuiTypography>
            <VuiBox
              border="2px solid"
              borderRadius="20px"
              borderColor={grey[600]}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="22px 20px"
            >
              {edit?.working_hours ? (
                <VuiInput
                  p="22px 20px"
                  placeholder="Working Hours E.g 9am to 12pm"
                  value={editParams?.working_hours}
                  onChange={(e) =>
                    setEditParams((prev) => ({
                      ...prev,
                      working_hours: e.target.value,
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
                  <AccessTimeIcon />
                  <VuiTypography
                    pl={2}
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    {editParams?.working_hours}
                  </VuiTypography>
                </>
              )}

              <VuiBox ml="auto" lineHeight={0}>
                {edit.working_hours ? (
                  <>
                    {loadingEdit.working_hours ? (
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
                            onClick={() => handleEditWorkHours()}
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
                                working_hours: false,
                              }));
                              setEditParams((prev) => ({
                                ...prev,
                                working_hours: editParams.working_hours,
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
                  <Tooltip title="Edit Working Hours" placement="top">
                    <Icon
                      onClick={() => handleEdit("working_hours")}
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
            <VuiTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              textTransform="uppercase"
            >
              Works Links
            </VuiTypography>
            <VuiBox
              border="2px solid"
              borderRadius="20px"
              borderColor={grey[600]}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="22px 20px"
            >
              {edit?.work_links ? (
                <VuiInput
                  p="22px 20px"
                  type="url"
                  placeholder="Work links (e.g. LinkedIn, Github, etc.)"
                  value={editParams?.work_links}
                  onChange={handleInputChange}
                  sx={{
                    "& input": {
                      color: "white",
                    },
                  }}
                />
              ) : (
                <>
                  <LinkIcon />
                  <VuiTypography
                    pl={2}
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    {editParams?.work_links}
                  </VuiTypography>
                </>
              )}

              <VuiBox ml="auto" lineHeight={0}>
                {edit.work_links ? (
                  <>
                    {loadingEdit.work_links ? (
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
                            onClick={() => handleEditWorksLinks()}
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
                                work_links: false,
                              }));
                              setEditParams((prev) => ({
                                ...prev,
                                work_links: editParams.work_links,
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
                  <Tooltip title="Edit Works Links" placement="top">
                    <Icon
                      onClick={() => handleEdit("work_links")}
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
