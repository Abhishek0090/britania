import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import { TextField, Autocomplete } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import RefreshIcon from "@mui/icons-material/Refresh";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CheckIcon from "@mui/icons-material/Check";
import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";
import VuiInput from "~/components/VuiInput";
import VuiButton from "~/components/VuiButton";
import axios from "axios";
import toast from "react-hot-toast";
import { URL } from "~/utils/BaseURL";
// Import CheckBoxes component (replace with actual path)
import { CheckBoxes } from "./Checkboxes";
import { Domain } from "@mui/icons-material";

function AssignmentType({ user, work }) {
  const [editParams, setEditParams] = useState({
    assignment_type: work?.assignment_type,
    domains: work?.domains,
  });

  const [loadingEdit, setLoadingEdit] = useState({
    assignment_type: false,
    domains: false,
  });

  const [edit, setEdit] = useState({
    assignment_type: false,
    domains: false,
  });

  const handleEdit = (name) => {
    setEdit((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const exisitingType = work?.assignment_type?.map((item) => item);

  const [checkBoxes, setCheckBoxes] = useState(exisitingType || []);

  const rawData = CheckBoxes?.map((item) => item.name);

  useEffect(() => {
    if (work) {
      setEditParams({
        assignment_type: work?.assignment_type,
        domains: work?.domains,
      });
    }
  }, [work]);

  const handleCancel = (name) => {
    setEdit((prev) => ({ ...prev, [name]: !prev[name] }));
    setEditParams((prev) => ({
      ...prev,
      assignment_type: work?.assignment_type,
    }));
  };

  const handleSave = async () => {
    setLoadingEdit((prev) => ({ ...prev, assignment_type: true }));
    try {
      const { data } = await axios.post(
        `${URL}/freelancer/editassignmenttype.php`,
        {
          freelancer_id: user?.id,
          assignment_type: editParams?.assignment_type,
        }
      );
      console.log(data);
      if (data?.status === 200) {
        toast.success(data?.message);
        setEdit((prev) => ({ ...prev, assignment_type: false }));
        setLoadingEdit((prev) => ({ ...prev, assignment_type: false }));
      } else {
        toast.error(data?.message);
        setLoadingEdit((prev) => ({ ...prev, assignment_type: false }));
      }
    } catch (error) {
      toast.error(error?.message);
      setLoadingEdit((prev) => ({ ...prev, assignment_type: false }));
    }
  };

  console.log(editParams.assignment_type);

  return (
    <Card id="delete-account">
      <VuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="10px"
      >
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          Assignments Details
        </VuiTypography>
        <>
          {edit.assignment_type ? (
            <div className="flex items-center justify-end gap-x-4">
              <VuiButton
                onClick={() => {
                  handleCancel("assignment_type");
                }}
                variant="outlined"
                color="info"
              >
                <span className="text-sm">Cancel</span>{" "}
                <CancelIcon className="ml-2 " />
              </VuiButton>
              {loadingEdit.assignment_type ? (
                <VuiButton
                  onClick={() => {
                    handleEdit("assignment_type");
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
                handleEdit("assignment_type");
              }}
              variant="contained"
              color="info"
            >
              Edit Type
            </VuiButton>
          )}
        </>
      </VuiBox>
      <VuiBox>
        <VuiBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <VuiTypography
                variant="caption"
                color="text"
                fontWeight="medium"
                textTransform="uppercase"
              >
                Assignment Type
              </VuiTypography>
              <VuiBox
                marginTop="10px"
                borderRadius="10px"
                borderColor="grey.600"
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                padding="5px 0px"
                bgcolor="transparent"
                flexWrap="wrap"
                gap="20px"
              >
                {edit?.assignment_type ? (
                  <Autocomplete
                    multiple
                    name="assignment_type"
                    className="w-[100%]"
                    options={rawData}
                    sx={{
                      "& input": {
                        color: "white",
                      },
                    }}
                    onChange={(event, types) => {
                      setEditParams((prev) => ({
                        ...prev,
                        assignment_type: types,
                      }));
                    }}
                    value={editParams.assignment_type}
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          "& fieldset": {
                            borderRadius: "20px",
                            padding: "22px 20px",
                          },
                        }}
                        className="border-2 border-yellow-55"
                        {...params}
                      />
                    )}
                  />
                ) : (
                  editParams.assignment_type?.map((item) => (
                    <VuiTypography
                      key={item}
                      pl={0}
                      variant="button"
                      color="white"
                      fontWeight="medium"
                    >
                      <span className="text-white bg-blue-950 p-1 px-2 mt-5 rounded-3xl ">
                        {item}
                        {/* <CancelIcon className="ml-2 cursor-pointer" /> */}
                      </span>
                    </VuiTypography>
                  ))
                )}
              </VuiBox>
            </Grid>
            <Grid item xs={12} md={12}>
              <VuiTypography
                variant="caption"
                color="text"
                fontWeight="medium"
                textTransform="uppercase"
              >
                Domain
              </VuiTypography>
              <VuiBox
                border="2px solid"
                borderRadius="20px"
                borderColor="grey.600"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p="22px 20px"
              >
                {edit?.domains ? (
                  <VuiInput
                    p="22px 20px"
                    placeholder="Domain"
                    value={editParams?.domains}
                    onChange={(e) =>
                      setEditParams((prev) => ({
                        ...prev,
                        domainsdomains: e.target.value,
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
                    <Domain />
                    <VuiTypography
                      pl={2}
                      variant="button"
                      color="white"
                      fontWeight="medium"
                    >
                      {editParams?.domains ? editParams?.domains : "null"}
                    </VuiTypography>
                  </>
                )}

                <VuiBox ml="auto" lineHeight={0}></VuiBox>
              </VuiBox>
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default AssignmentType;
