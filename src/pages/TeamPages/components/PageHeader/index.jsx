import { Typography, Grid } from '@mui/material';

export default function PageHeader({ title, subtitle }) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle2">{subtitle}</Typography>
      </Grid>
    </Grid>
  );
}
