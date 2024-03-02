import {
  Box,
  CardHeader,
  Typography,
  IconButton,
  FormControlLabel,
  FormGroup,
  Tooltip,
} from '@mui/material';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import { TimelineWrapper, CheckboxWrapper } from '~/utils/CustomStyles';

export default function Checklist() {
  return (
    <Box>
      <CardHeader
        sx={{
          px: 0,
          pt: 0,
        }}
        action={
          <Tooltip arrow title="Refresh list">
            <IconButton size="small" color="primary">
              <RefreshTwoToneIcon />
            </IconButton>
          </Tooltip>
        }
        title="Checklist"
      />
      <TimelineWrapper>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <AssignmentTwoToneIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              variant="h4"
              sx={{
                pb: 2,
              }}
            >
              "Tasks Quick List"
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<CheckboxWrapper color="primary" name="checkedC" />}
                label="Prepare website launch"
              />
              <FormControlLabel
                control={<CheckboxWrapper color="primary" name="checkedC" />}
                label="Build React Native application"
              />
              <FormControlLabel
                control={<CheckboxWrapper color="primary" name="checkedC" />}
                label="Fix remaining bugs for first 4 pages"
              />
            </FormGroup>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <AccountTreeTwoToneIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              variant="h4"
              sx={{
                pb: 2,
              }}
            >
              "Project Management"
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<CheckboxWrapper color="primary" name="checkedC" />}
                label="Complete sales pitch"
              />
              <FormControlLabel
                control={<CheckboxWrapper color="primary" name="checkedC" />}
                label="Improve SEO visibility"
              />
            </FormGroup>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <BusinessCenterTwoToneIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              variant="h4"
              sx={{
                pb: 2,
              }}
            >
              "Business & Marketing"
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<CheckboxWrapper color="primary" name="checkedC" />}
                label="Create marketing campaign"
              />
              <FormControlLabel
                control={<CheckboxWrapper color="primary" name="checkedC" />}
                label="Sign business contract with partners"
              />
            </FormGroup>
          </TimelineContent>
        </TimelineItem>
      </TimelineWrapper>
    </Box>
  );
}
