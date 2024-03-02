import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  Button,
  Card,
  Grid,
  Box,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Text from "~/pages/TeamPages/components/Text";
import useMediaQuery from "@mui/material/useMediaQuery";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import SchoolIcon from "@mui/icons-material/School";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import DescriptionIcon from "@mui/icons-material/Description";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CloudDownloadTwoToneIcon from "@mui/icons-material/CloudDownloadTwoTone";
import EventAvailableTwoToneIcon from "@mui/icons-material/EventAvailableTwoTone";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import { URL } from "~/utils/BaseURL";
import { useEffect } from "react";

export default function AssignmentDetails({
  assignmentDetails,
  assignedPM,
  id,
}) { 
  return (
    <>
      <Grid item xs={12} md={12} className="px-2">
        <Card
          variant="outlined"
          sx={{
            p: 1,
            background: `inherit`,
          }}
        >
          <Box
            sx={{
              mt: 3,
            }}
          >
            {assignmentDetails?.title !== "NULL" && (
              <Typography color="white" sx={{ fontSize: "16px" }}>
                <Text
                  sx={{
                    "@media (min-width: 768px)": {
                      fontSize: "1.2rem",
                    },
                    "@media (max-width: 400px)": {
                      fontSize: "1rem",
                    },
                  }}
                >
                  <ViewStreamIcon
                    sx={{
                      mr: 1,
                    }}
                    className="text-gray-200"
                  />
                  <span className="text-gray-200">Title: </span>{" "}
                  <b className="text-gray-200">{assignmentDetails?.title}</b>
                </Text>
              </Typography>
            )}

            <Typography
              className="text-gray-200"
              sx={{
                mt: 1,
                fontSize: "16px",
              }}
            >
              <SubtitlesIcon
                sx={{
                  mr: 1,
                }}
                className="text-gray-200"
              />
              Assignment Level:{" "}
              <Text>
                <b className="text-gray-200">{assignmentDetails?.level}</b>
              </Text>
            </Typography>

            <Typography
              className="text-gray-200"
              sx={{
                mt: 1,
                fontSize: "16px",
              }}
            >
              <KeyboardIcon
                sx={{
                  mr: 1,
                }}
                className="text-gray-200"
              />
              Assignment Type:{" "}
              <Text>
                <b className="text-gray-200">
                  {assignmentDetails?.type?.map((type, id) => (
                    <span
                      key={id}
                      className=" mx-1 inline-flex items-center px-3 py-0.5 mt-2 rounded-full text-sm font-medium bg-blue-900 text-blue-100"
                    >
                      <span>{type}</span>
                    </span>
                  ))}
                </b>
              </Text>
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontSize: "16px",
              }}
              className="text-gray-200"
            >
              <DescriptionIcon
                sx={{
                  mr: 1,
                }}
                className="text-gray-200"
              />
              Description :{" "}
              <Text>
                <b className="text-gray-200">
                  {assignmentDetails?.description}
                </b>
              </Text>
            </Typography>
          </Box>

          <Divider
            sx={{
              my: 2,
            }}
          />
          <div className="flex md:items-center md:justify-between md:flex-row flex-col items-start justify-start gap-10 md:gap-0">
            <div className="flex md:items-center md:justify-between md:flex-row flex-col items-start justify-start gap-2">
              <Typography
                sx={{
                  mr: 1,
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "16px",
                }}
              >
                <EventAvailableTwoToneIcon
                  sx={{
                    mr: 1,
                  }}
                />
                Deadline:
              </Typography>
              <span className="text-gray-200">
                {moment(assignmentDetails?.deadline).format(
                  "Do MMMM YYYY h:mm:ss a"
                )}
              </span>
            </div>
            {/* <div className="flex md:items-center md:justify-between md:flex-row flex-col items-start justify-start gap-2">
              <Typography
                sx={{
                  mr: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "16px",
                }}
                className="text-gray-200"
              >
                <PendingActionsIcon
                  sx={{
                    mr: 1,
                  }}
                  className="text-gray-200"
                />
                Submission Date:
              </Typography>
 
              <span className="text-gray-200">
                {moment(
                  assignmentDetails?.submission_date,
                  "DD-MM-YYYY HH:mm:ss"
                ).format("Do MMMM YYYY h:mm:ss a")}
              </span>
            </div> */}
          </div>
        </Card>
        <Card
          variant="outlined"
          sx={{
            p: 1,
            mt: 2,
            background: `inherit`,
          }}
        >
          <Box>
            {assignedPM !== undefined ? (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    mt: 1,
                    fontWeight: "bold",
                    color: "#ffa000",
                  }}
                >
                  PM Details
                </Typography>
                <Typography
                  className="text-gray-200"
                  sx={{
                    mt: 1,
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  Name:{" "}
                  <Text color="info">
                    <b> {assignedPM?.name}</b>
                  </Text>
                </Typography>
                <Typography
                  component={"a"}
                  className="text-gray-200"
                  sx={{
                    mt: 1,
                    fontSize: "16px",
                  }}
                  href={`https://wa.me/91${assignedPM?.number}?text=Hi%20I%20am%20interested%20in%20your%20services%20and%20would%20like%20to%20know%20more%20about%20it.`}
                >
                  Number:{" "}
                  <Text color="success">
                    <b>{assignedPM?.number}</b>
                  </Text>
                </Typography>
              </>
            ) : null}
          </Box>
        </Card>
        {/* ) : null} */}
      </Grid>
    </>
  );
}
