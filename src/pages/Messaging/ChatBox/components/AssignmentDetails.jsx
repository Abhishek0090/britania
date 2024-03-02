import React, { useState } from "react"; 
import moment from "moment"; 
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
import Text from "~/pages/TeamPages/components/Text"; 
import ViewStreamIcon from "@mui/icons-material/ViewStream"; 
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import DescriptionIcon from "@mui/icons-material/Description"; 
import PendingActionsIcon from "@mui/icons-material/PendingActions"; 
import EventAvailableTwoToneIcon from "@mui/icons-material/EventAvailableTwoTone";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";
 

export default function AssignmentDetails({
  assignmentDetails,
  assignedPM,
  id,
}) {
  console.log(assignmentDetails); 

  return (
    <>
      <Grid item xs={12} md={12} className="px-3">
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
            {assignmentDetails?.assignment_title !== "NULL" && (
              <Typography color="text.secondary">
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
                      color: "black",
                    }}
                  />
                  <span className="text-black">Title:</span>{" "}
                  <b color="text.secondary">
                    {assignmentDetails?.assignment_title}
                  </b>
                </Text>
              </Typography>
            )}

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              <SubtitlesIcon
                sx={{
                  mr: 1,
                }}
              />
              Assignment Level:{" "}
              <Text color="black">
                <b>{assignmentDetails?.assignment_level}</b>
              </Text>
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              <KeyboardIcon
                sx={{
                  mr: 1,
                }}
              />
              Assignment Type:{" "}
              <Text color="black">
                <b>
                  {assignmentDetails?.assignment_type?.map((type, id) => (
                    <span
                      key={id}
                      className=" mx-1 inline-flex items-center px-3 py-0.5 mt-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      <span>{type}</span>
                    </span>
                  ))}
                </b>
              </Text>
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              <DescriptionIcon
                sx={{
                  mr: 1,
                }}
              />
              Description:{" "}
              <Text color="black">
                <b>{assignmentDetails?.assignment_description}</b>
              </Text>
            </Typography>
          </Box>

          <Divider
            sx={{
              my: 2,
            }}
          />
          <div className="flex md:items-center md:justify-between md:flex-row flex-col items-start justify-start gap-10 md:gap-0">
            <div className="flex  items-center justify-between flex-row   gap-2">
              <Typography
                sx={{
                  mr: 1,
                  color: "green",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CurrencyRupeeTwoToneIcon
                  sx={{
                    mr: 1,
                  }}
                />
                Budget:
              </Typography>
              <span>
                <b>₹ {assignmentDetails?.assignment_budget}</b>
              </span>
            </div>

            <div className="flex md:items-center md:justify-between md:flex-row flex-col items-start justify-start gap-2">
              <Typography
                sx={{
                  mr: 1,
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <EventAvailableTwoToneIcon
                  sx={{
                    mr: 1,
                  }}
                />
                Deadline:
              </Typography>
              <span>
                {moment(assignmentDetails?.assignment_deadline).format(
                  "Do MMMM YYYY h:mm:ss a"
                )}
              </span>
            </div>
            <div className="flex md:items-center md:justify-between md:flex-row flex-col items-start justify-start gap-2">
              <Typography
                sx={{
                  mr: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <PendingActionsIcon
                  sx={{
                    mr: 1,
                  }}
                />
                Submission Date:
              </Typography>

              {/* submission_date */}
              <span>
                {moment(
                  assignmentDetails?.assignment_submission_date,
                  "DD-MM-YYYY HH:mm:ss"
                ).format("Do MMMM YYYY h:mm:ss a")}
              </span>
            </div>
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
                  color="text.primary"
                  variant="h5"
                  sx={{
                    mt: 1,
                    fontWeight : "bold"
                  }}
                >
                  PM Details
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    cursor: "pointer",
                  }}
                >
                  Name:{" "}
                  <Text color="info">
                    <b>{assignedPM?.project_manager_name}</b>
                  </Text>
                </Typography>
                <Typography
                  component={"a"}
                  color="text.secondary"
                  sx={{
                    mt: 1,
                  }}
                  href={`https://wa.me/91${assignedPM?.project_manager_number}?text=Hi%20I%20am%20interested%20in%20your%20services%20and%20would%20like%20to%20know%20more%20about%20it.`}
                >
                  Number:{" "}
                  <Text color="success">
                    <b>{assignedPM?.project_manager_number}</b>
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
