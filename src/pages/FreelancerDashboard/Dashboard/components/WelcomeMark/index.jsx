import React, { useState, useEffect } from "react";
import { Card, Icon } from "@mui/material";
import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";
import { useNavigate } from "react-router-dom";
import colors from "~/layout/SidebarLayout/theme/base/colors";
import linearGradient from "~/layout/SidebarLayout/theme/functions/linearGradient";
import cardImgF from "~/assets/images/cardimgfree-f.png";
import cardImgM from "~/assets/images/cardimgfree-m.png";
import { LucideArrowRight } from "lucide-react";

export default function WelcomeMark({ user }) {
  const navigate = useNavigate();
  const { gradients } = colors;
  const { cardContent } = gradients;
  const [imgState, setImgState] = useState(cardImgM);

  useEffect(() => {
    if (user?.gender === "Male") {
      setImgState(cardImgM);
    } else {
      setImgState(cardImgF);
    }
  }, [user]);

  return (
    <Card
      sx={() => ({
        height: "340px",
        py: "32px",

        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          background: linearGradient(
            gradients.cardDark.main,
            gradients.cardDark.state,
            gradients.cardDark.deg
          ),
        },

        "&:after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          backgroundImage: `url(${imgState})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50%",
        },
      })}
    >
      <VuiBox
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <VuiBox>
          <VuiTypography
            color="text"
            variant="button"
            fontWeight="regular"
            mb="12px"
          >
            Welcome back,
          </VuiTypography>
          <VuiTypography color="white" variant="h3" fontWeight="bold" mb="18px">
            {user?.firstname} {user?.lastname}
          </VuiTypography>
          <VuiTypography
            color="text"
            variant="h6"
            fontWeight="regular"
            mb="auto"
          >
            Glad to see you again!
          </VuiTypography>
        </VuiBox>
        <VuiTypography
          onClick={() => navigate("/dashboard/freelancer/assignment")}
          variant="button"
          color="white"
          fontWeight="regular"
          sx={{
            zIndex: 2,
            mr: "5px",
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",

            "& .material-icons-round": {
              fontSize: "1.125rem",
              transform: `translate(2px, -0.5px)`,
              transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
            },

            "&:hover .material-icons-round, &:focus  .material-icons-round": {
              transform: `translate(6px, -0.5px)`,
            },
          }}
        >
          Tap to explore
          <Icon sx={{ fontWeight: "bold", ml: "5px" }}>
            <LucideArrowRight size={15} />
          </Icon>
        </VuiTypography>
      </VuiBox>
    </Card>
  );
}
