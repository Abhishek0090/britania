import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Typography,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  ListItemText,
  Avatar,
  useTheme,
} from '@mui/material';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import Text from '~/pages/TeamPages/components/Text';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';

const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`
);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',

            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function PopularTags({ user, userWork }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(' ');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Work Section" />
      <Divider />
      <ListWrapper disablePadding>
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` },
          }}
          button
        >
          <ListItemText primary={`Working Hours: ${userWork?.working_hours}`} />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` },
          }}
          button
        >
          <ListItemText primary={`Qualification: ${userWork?.qualification}`} />
        </ListItem>
        <Divider />
        <ListItem
          onClick={() => {
            handleClickOpen();
            setExperience(userWork?.experience);
          }}
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` },
          }}
          button
        >
          {' '}
          <ListItemAvatar>
            <WifiProtectedSetupIcon sx={{ color: 'primary.main' }} />
          </ListItemAvatar>
          <ListItemText primary="Experience" />
        </ListItem>
        <Divider />
        <ListItem
          onClick={() => {
            handleClickOpen();
            setExperience(userWork?.past_experience);
          }}
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` },
          }}
          button
        >
          {' '}
          <ListItemAvatar>
            <WifiProtectedSetupIcon sx={{ color: 'primary.main' }} />
          </ListItemAvatar>
          <ListItemText primary="Past Experience" />
        </ListItem>
        <Divider />

        {/* TODO: Work Links */}
        <ListSubheader>
          <Typography sx={{ py: 1.5 }} variant="h4" color="text.primary">
            Work Links
          </Typography>
        </ListSubheader>
        <Divider />
        <ListItem
          button
          onClick={() => {
            if (
              userWork?.linkedin?.includes('http') ||
              userWork?.linkedin?.includes('https')
            )
              window.open(userWork?.linkedin, '_blank');
            else window.open(`https://${userWork?.linkedin}`, '_blank');
          }}
        >
          <ListItemAvatar>
            <Avatar
              sx={{ width: 40, height: 40 }}
              src="https://img.icons8.com/fluency/144/null/linkedin.png"
            />
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{
              variant: 'h5',
              color: `${theme.colors.alpha.black[100]}`,
            }}
            primary="LinkedIn"
          />
        </ListItem>
        <Divider />
        {userWork?.work_links?.split(',').map((link, index) => (
          <ListItem
            key={index}
            onClick={() => {
              if (link.includes('http') || link.includes('https'))
                window.open(link, '_blank');
              else window.open(`https://${link}`, '_blank');
            }}
            button
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  background: `${theme.colors.info.main}`,
                  color: `${theme.palette.info.contrastText}`,
                }}
              >
                <InsertLinkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                variant: 'h5',
                color: `${theme.colors.alpha.black[100]}`,
              }}
              primary={`${'Work Links'} ${index + 1}`}
            />
          </ListItem>
        ))}
      </ListWrapper>

      <BootstrapDialog
        scroll="paper"
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Experience Details
        </BootstrapDialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="w-full text-gray-600 ">
              <div className="flex flex-wrap ">
                <div className="flex flex-col  rounded-lg sm:flex-row">
                  <div className="flex-grow flex-col flex items-start justify-start">
                    <p className="break-all text-base leading-relaxed flex text-left text-white">
                      {experience}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </BootstrapDialog>
    </Card>
  );
}

export default PopularTags;
