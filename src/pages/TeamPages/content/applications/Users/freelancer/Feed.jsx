import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@mui/material';
import Text from '~/pages/TeamPages/components/Text';
import Label from '~/pages/TeamPages/components/Label';
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';

function Feed({ userWork }) {
  return (
    <Card>
      <CardHeader title="Specialization" />
      <Divider />
      <Box p={2}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={3}>
                  <Box pr={3} pb={2}>
                    Date of Submission:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <EventTwoToneIcon sx={{ mr: 1 }} />
                    <b>{userWork?.date_of_submission}</b>
                  </Text>
                </Grid>
                {userWork?.typing_speed && (
                  <>
                    <Grid item xs={12} sm={4} md={3}>
                      <Box pr={3} pb={2}>
                        Typing Speed:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <Text color="black">
                        <b>
                          <Label color="primary" sx={{ mr: 1, mb: 1 }}>
                            {userWork?.typing_speed}
                          </Label>
                        </b>
                      </Text>
                    </Grid>
                  </>
                )}
                <Grid item xs={12} sm={4} md={3}>
                  <Box pr={3} pb={2}>
                    Assignment Types:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>
                      {userWork?.assignment_type?.map((type) => (
                        <Label color="primary" sx={{ mr: 1, mb: 1 }} key={type}>
                          {type}
                        </Label>
                      ))}
                    </b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <Box pr={3} pb={2}>
                    Domains:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>
                      {userWork?.domains?.split(',')?.map((type) => (
                        <Label color="primary" sx={{ mr: 1, mb: 1 }} key={type}>
                          {type}
                        </Label>
                      ))}
                    </b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <Box pr={3} pb={2}>
                    Subject Tags:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>
                      {userWork?.subject_tags?.map((type) => (
                        <Label color="primary" sx={{ mr: 1, mb: 1 }} key={type}>
                          {type}
                        </Label>
                      ))}
                    </b>
                  </Text>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Card>
  );
}

export default Feed;
