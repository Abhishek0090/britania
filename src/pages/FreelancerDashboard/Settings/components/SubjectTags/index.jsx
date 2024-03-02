import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Virtualize from "./Virtualize";
import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";
import VuiButton from "~/components/VuiButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import { URL } from "~/utils/BaseURL";

// Images
import colors from "~/layout/SidebarLayout/theme/base/colors";

export default function SubjectTags({ work, user }) {
  const { grey } = colors;

  const [editParams, setEditParams] = useState({
    subject_tags: work?.subject_tags,
  });

  console.log(user);
  console.log(work);

  const [subjectTags, setSubjectTags] = useState([]);
  useEffect(() => {
    setEditParams((prev) => ({
      ...prev,
      subject_tags: subjectTags,
    }));
  }, [subjectTags]);

  const [loadingEdit, setLoadingEdit] = useState({
    subject_tags: false,
  });
  const [edit, setEdit] = useState({
    subject_tags: false,
  });
  const handleEdit = (name) => {
    setEdit((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleCancel = (name) => {
    setEdit((prev) => ({ ...prev, [name]: !prev[name] }));
    setEditParams({
      subject_tags: work?.subject_tags,
    });
  };

  const handleSave = async () => {
    setLoadingEdit((prev) => ({ ...prev, subject_tags: true }));
    try {
      const { data } = await axios.post(
        `${URL}/freelancer/editsubjecttags.php`,
        {
          freelancer_id: user?.id,
          subject_tags: editParams?.subject_tags,
        }
      );
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, subject_tags: false }));
        setLoadingEdit((prev) => ({ ...prev, subject_tags: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, subject_tags: false }));
      }

      console.log(data);
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, subject_tags: false }));
    }
  };

  useEffect(() => {
    if (work)
      setEditParams({
        subject_tags: work?.subject_tags,
      });
  }, [work]);

  // work?.subject_tags?.map((tag) => tag?.split(','))[0];

  return (
    <Card id="delete-account">
      <VuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="32px"
      >
        <VuiTypography variant="lg" fontWeight="bold" color="white">
          Subject Tags
        </VuiTypography>
        <>
          {edit.subject_tags ? (
            <div className="flex items-center justify-end gap-x-4">
              <VuiButton
                onClick={() => {
                  handleCancel("subject_tags");
                }}
                variant="outlined"
                color="info"
              >
                <span className="text-sm">Cancel</span>{" "}
                <CancelIcon className="ml-2 " />
              </VuiButton>
              {loadingEdit.subject_tags ? (
                <VuiButton
                  onClick={() => {
                    handleEdit("subject_tags");
                  }}
                  variant="contained"
                  color="info"
                >
                  <span className="text-sm">Save</span>{" "}
                  <RefreshIcon className="animate-spin ml-2" />
                </VuiButton>
              ) : (
                <VuiButton
                  onClick={() => {
                    handleSave();
                  }}
                  variant="contained"
                  color="info"
                >
                  <span className="text-sm">Save</span>{" "}
                  <CheckIcon className="ml-2" />
                </VuiButton>
              )}
            </div>
          ) : (
            <VuiButton
              onClick={() => {
                handleEdit("subject_tags");
              }}
              variant="contained"
              color="info"
            >
              Edit Tag
            </VuiButton>
          )}
        </>
      </VuiBox>
      <VuiBox>
        <Grid container>
          <Grid item xs={12} md={12}>
            <VuiBox
              borderRadius="10px"
              borderColor={grey[600]}
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              padding="1px 0px"
              bgcolor="transparent"
              flexWrap="wrap"
              gap="10px"
            >
              {edit.subject_tags ? (
                <Virtualize
                  setSubjectTags={setSubjectTags}
                  subjectTags={editParams.subject_tags}
                />
              ) : (
                <>
                  {" "}
                  {editParams?.subject_tags?.length > 0 && (
                    <>
                      {" "}
                      {editParams?.subject_tags?.map((item) => (
                        <VuiTypography
                          key={item}
                          pl={2}
                          variant="button"
                          color="white"
                          fontWeight="medium"
                        >
                          <span className="text-white bg-blue-950 p-1 px-2 mt-5 rounded-3xl ">
                            {item}
                            {/* <CancelIcon
                              onClick={() => {
                                setEditParams((prev) => ({
                                  ...prev,
                                  subject_tags: prev?.subject_tags?.filter(
                                    (tag) => tag !== item
                                  ),
                                }));
                              }}
                              className="ml-2 cursor-pointer"
                            /> */}
                          </span>
                        </VuiTypography>
                      ))}
                    </>
                  )}
                </>
              )}
            </VuiBox>
          </Grid>
        </Grid>
      </VuiBox>
    </Card>
  );
}
