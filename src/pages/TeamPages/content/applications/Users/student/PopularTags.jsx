import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme,
  styled,
} from '@mui/material';

const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`
);

function PopularTags({ user }) {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Assignment Stats" />
      <Divider />
      <ListWrapper disablePadding>
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` },
          }}
          button
        >
          <ListItemText
            primary={`Total Freelancing Assignments: ${user?.total_freelancing_assignments_count}`}
          />
        </ListItem>
        <Divider />
      </ListWrapper>
    </Card>
  );
}

export default PopularTags;
