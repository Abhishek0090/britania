// import { Typography, Button, Grid } from '@mui/material';
import { Typography, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "~/features/auth/authSlice";
// import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import toast from "react-hot-toast";
import { URL } from "~/utils/BaseURL";

function PageHeader() {
  const auth = useSelector(selectAuth);
  const user = {
    name: auth?.teamData?.name,
    avatar: "/static/images/avatars/1.jpg",
  };

  const [allAssignmentsData, setAllAssignmentsData] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/team/studentstable.php`)
      .then((response) => {
        setAllAssignmentsData(response?.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something Went Wrong");
      });
  }, []);

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          All Students
        </Typography>
        <Typography variant="subtitle2">
          there are total {allAssignmentsData?.length} students.
        </Typography>
      </Grid>
      {/* <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Create transaction
        </Button>
      </Grid> */}
    </Grid>
  );
}

export default PageHeader;
