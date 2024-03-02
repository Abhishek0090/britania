// prop-types is library for typechecking of props
import PropTypes from "prop-types";

import { Card, Divider } from "@mui/material";

import VuiBox from "~/components/VuiBox";
import VuiTypography from "~/components/VuiTypography";

import colors from "~/layout/SidebarLayout/theme/base/colors";
import typography from "~/layout/SidebarLayout/theme/base/typography";

function ProfileInfoCard({
  title,
  description,
  info,
  social,
  worklinks,
  contacts,
}) {
  const colorsArray = ["#655DBB", "#2F58CD", "#3795BD", "#3A1078", "#060047"];
  const labels = [];
  const values = [];
  const { size } = typography;

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(
        uppercaseLetter,
        ` ${uppercaseLetter.toLowerCase()}`
      );

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <VuiBox key={label} display="flex" py={1} pr={2}>
      <VuiTypography
        variant="button"
        color="text"
        fontWeight="regular"
        textTransform="capitalize"
      >
        {label}:
      </VuiTypography>
      {/* // if values[key] contains comma, split it and render it as a list */}
      {values[key].match(/,/g) &&
      label !== "address" &&
      label !== "experience" ? (
        <VuiBox
          display="flex"
          alignItems="center"
          sx={{
            flexWrap: "wrap",
          }}
        >
          {" "}
          {/* &nbsp; &nbsp; &nbsp; */}
          {info.description ? (
            <VuiTypography
              variant="button"
              color="white"
              fontWeight="regular"
              textTransform="capitalize"
              sx={{
                // backgroundColor: "#3795BD",
                borderRadius: "10px",
                padding: "0rem 0.5rem",
                marginRight: "0.5rem",
                marginBottom: "0.5rem",
                cursor: "pointer",
              }}
            >
              &nbsp;{info.description}
            </VuiTypography>
          ) : (
            values[key]?.split(",")?.map((el) => (
              <VuiTypography
                key={el}
                variant="button"
                color="white"
                fontWeight="regular"
                textTransform="capitalize"
                sx={{
                  backgroundColor: "#3795BD",
                  borderRadius: "10px",
                  padding: "0.25rem 0.5rem",
                  marginRight: "0.5rem",
                  marginBottom: "0.5rem",
                  cursor: "pointer",
                }}
              >
                &nbsp;{el}
              </VuiTypography>
            ))
          )}
        </VuiBox>
      ) : (
        <VuiTypography variant="button" fontWeight="regular" color="white">
          &nbsp;
          {label === "subjectTags" ? (
            <VuiTypography
              key={el}
              variant="button"
              color="white"
              fontWeight="regular"
              textTransform="capitalize"
              sx={{
                backgroundColor: "#3795BD",
                borderRadius: "10px",
                padding: "0.25rem 0.5rem",
                marginRight: "0.5rem",
                marginBottom: "0.5rem",
                cursor: "pointer",
              }}
            >
              {values[key]}
            </VuiTypography>
          ) : (
            <> {values[key]}</>
          )}
        </VuiTypography>
      )}
    </VuiBox>
  ));

  // Render the card social media icons
  const renderSocial = social?.map(({ link, icon, color }) => (
    <VuiBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color="white"
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </VuiBox>
  ));
  const renderSocialContacts = contacts?.map(({ link, icon, color }) => (
    <VuiBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color="white"
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </VuiBox>
  ));
  const renderWorkLinks = worklinks?.map(({ link, icon, color }) => (
    <VuiBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      pr={1}
      pl={0.5}
      lineHeight={1}
      sx={{
        color: color,
      }}
    >
      {icon}
    </VuiBox>
  ));

  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <VuiBox
        display="flex"
        mb="14px"
        justifyContent="space-between"
        alignItems="center"
      >
        <VuiTypography
          variant="lg"
          fontWeight="bold"
          color="white"
          textTransform="capitalize"
        >
          {title}
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        {description ? (
          <>
            <VuiBox mb={2} lineHeight={1}>
              <VuiTypography variant="button" color="text" fontWeight="regular">
                {description}
              </VuiTypography>
            </VuiBox>
            <VuiBox opacity={0.3}>
              <Divider />
            </VuiBox>
          </>
        ) : (
          "Not Available"
        )}

        <VuiBox>
          {renderItems}
          {social?.length > 0 && (
            <VuiBox display="flex" py={1} pr={2} color="white">
              <VuiTypography
                variant="button"
                fontWeight="regular"
                color="text"
                textTransform="capitalize"
              >
                social: &nbsp;
              </VuiTypography>
              {renderSocial}
            </VuiBox>
          )}
          {contacts?.length > 0 && (
            <VuiBox display="flex" py={1} pr={2} color="white">
              <VuiTypography
                variant="button"
                fontWeight="regular"
                color="text"
                textTransform="capitalize"
              >
                Contact Here: &nbsp;
              </VuiTypography>
              {renderSocialContacts}
            </VuiBox>
          )}
          {worklinks?.length > 0 && (
            <VuiBox display="flex" py={1} pr={2} color="white">
              <VuiTypography
                variant="button"
                fontWeight="regular"
                color="text"
                textTransform="capitalize"
              >
                Work Links: &nbsp;&nbsp;
              </VuiTypography>
              {renderWorkLinks}
            </VuiBox>
          )}
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ProfileInfoCard;
