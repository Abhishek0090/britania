import { Card } from "@mui/material";
import moment from "moment";

import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";
// React icons
import { BsCheckCircleFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { BsCreditCardFill } from "react-icons/bs";
import { SiDropbox } from "react-icons/si";

// Vision UI Dashboard React example components
import TimelineItem from "~/components/Timeline/TimelineItem";

// Vision UI Dashboard theme imports
import palette from "~/layout/SidebarLayout/theme/base/colors";

function formatDate(deadlineString) {
  // Parse the date string using moment
  const deadlineMoment = moment(deadlineString, "YYYY-MM-DD HH:mm:ss");

  // Format the date as per your requirement
  const formattedDeadline = deadlineMoment.format("DD/MM/YYYY h:mm A");

  return formattedDeadline;
}

function OrdersOverview({ latestAssignment }) {
  return (
    <Card className="h-100">
      <VuiBox mb="16px">
        <VuiTypography variant="lg" fontWeight="bold" mb="5px" color="white">
          Latest Assignment Details
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <TimelineItem
          icon={<FaBell size="16px" color={palette.info.main} />}
          title="Title of the assignment"
          dateTime={latestAssignment?.title}
        />
        <TimelineItem
          icon={<IoLogoCss3 size="16px" color={palette.error.main} />}
          title="Assignment Course"
          dateTime={latestAssignment?.course}
        />
        <TimelineItem
          icon={<FaShoppingCart size="16px" color={palette.lightblue.main} />}
          title="Assignment Type"
          dateTime={latestAssignment?.type?.map((type) => type).join(", ")}
        />
        <TimelineItem
          icon={<BsCreditCardFill size="16px" color={palette.warning.main} />}
          title="Assignment Level"
          dateTime={latestAssignment?.level}
        />
        <TimelineItem
          icon={<BsCreditCardFill size="16px" color={palette.warning.main} />}
          title="Assignment Tags"
          dateTime={latestAssignment?.subject_tags
            ?.map((tag) => tag)
            .join(", ")}
        />
        <TimelineItem
          icon={<SiDropbox size="16px" color={palette.primary.focus} />}
          title="Assignment Deadline"
          dateTime={formatDate(latestAssignment?.deadline)}
        />
      </VuiBox>
    </Card>
  );
}

export default OrdersOverview;
