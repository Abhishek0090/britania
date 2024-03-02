import { Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import { AvatarPageTitle } from '~/utils/CustomStyles';
import { useSelector } from 'react-redux';
import { selectAuth } from '~/features/auth/authSlice';
function PageHeader({ id, assignmentDetails }) {
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const user = {
    name: auth?.teamData?.name,
    avatar: '/static/images/avatars/1.jpg',
  };

  const nextHandler = () => {
    if (!assignmentDetails?.next_assignment_id) {
      return;
    }
    navigate(
      `/team/management/assignments/details/${Number(
        assignmentDetails?.next_assignment_id
      )}`
    );
    console.log('next');
  };

  const prevHandler = () => {
    if (!assignmentDetails?.previous_assignment_id) {
      return;
    }
    navigate(
      `/team/management/assignments/details/${Number(
        assignmentDetails?.previous_assignment_id
      )}`
    );
    console.log('prev');
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <Box>
        <AvatarPageTitle
          onClick={prevHandler}
          sx={{ cursor: 'pointer' }}
          variant="rounded"
        >
          <ArrowBackTwoToneIcon fontSize="large" />
        </AvatarPageTitle>
      </Box>
      <Box>
        <Typography variant="h3" component="h3" gutterBottom>
          Assignment Id: {id}
        </Typography>
      </Box>
      <Box>
        <AvatarPageTitle
          onClick={nextHandler}
          sx={{ cursor: 'pointer' }}
          variant="rounded"
        >
          <ArrowForwardTwoToneIcon fontSize="large" />
        </AvatarPageTitle>
      </Box>
    </div>
  );
}

export default PageHeader;
