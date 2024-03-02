import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import RedeemIcon from "@mui/icons-material/Redeem";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ElevatorIcon from "@mui/icons-material/Elevator";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AccessibleIcon from "@mui/icons-material/Accessible";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssistantIcon from "@mui/icons-material/Assistant";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import FilterBAndWIcon from "@mui/icons-material/FilterBAndW";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import CampaignIcon from "@mui/icons-material/Campaign";
import SpaIcon from "@mui/icons-material/Spa";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import BarChartIcon from "@mui/icons-material/BarChart";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import BallotIcon from "@mui/icons-material/Ballot";
import {
  BakeryDining,
  BrightnessLowTwoTone,
  Chat,
  MarkunreadSharp,
} from "@mui/icons-material";
import { Crown } from "lucide-react";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

export const MenuList = [
  {
    scope: [
      "Non-Technical pm",
      "Technical pm",
      "Admin",
      "Non-Technical hr",
      "Technical hr",
      "Brainheaters",
    ],
    name: "Dashboard",
    submenu: true,
    icon: <ApartmentIcon />,
    sublinks: [
      {
        scope: [
          "Non-Technical pm",
          "Technical pm",
          "Admin",
          "Non-Technical hr",
          "Technical hr",
          "Brainheaters",
        ],
        name: "Overview",
        link: "/team/dashboards/tasks",
        icon: <ChecklistIcon />,
      },
      {
        name: "Messenger",
        link: "/team/dashboards/messenger",
        icon: <BrightnessLowTwoTone />,
      },
    ],
  },

  // {
  //   scope: [
  //     "Non-Technical pm",
  //     "Technical pm",
  //     "Admin",
  //     "Non-Technical hr",
  //     "Technical hr",
  //     "Brainheaters",
  //   ],
  //   name: "BrainHeaters",
  //   submenu: false,
  //   link: "/team/dashboards/brainheaters",
  //   icon: <BakeryDining />,
  // },
  {
    scope: [
      "Non-Technical pm",
      "Technical pm",
      "Admin",
      "Non-Technical hr",
      "Technical hr",
    ],
    name: "Chats",
    icon: <Chat />,
    link: "/team/dashboards/chats",
  },
  {
    scope: [
      "Non-Technical pm",
      "Technical pm",
      "Admin",
      "Non-Technical hr",
      "Technical hr",
    ],
    name: "Assignment",
    submenu: true,
    icon: <AssignmentIcon />,
    sublinks: [
      {
        scope: [
          "Non-Technical pm",
          "Technical pm",
          "Admin",
          "Non-Technical hr",
          "Technical hr",
        ],
        name: "All",
        icon: <AssignmentTurnedInIcon />,
        link: "/team/management/assignments/allassignments",
      },
      {
        scope: [
          "Non-Technical pm",
          "Technical pm",
          "Admin",
          "Non-Technical hr",
          "Technical hr",
        ],
        name: "Assigned to PM",
        icon: <AssignmentIndIcon />,
        link: "/team/management/assignments/assignedassignmentspm",
      },
      {
        scope: [
          "Non-Technical pm",
          "Technical pm",
          "Admin",
          "Non-Technical hr",
          "Technical hr",
        ],
        name: "Assigned to Freelancers",
        icon: <AssistantIcon />,
        link: "/team/management/assignments/assignedassignmentsfreelancers",
      },

      {
        scope: ["Technical pm", "Technical hr", "Admin"],
        name: "Technical",
        icon: <PermDataSettingIcon />,
        link: "/team/management/assignments/technicalassignments",
      },
      {
        scope: ["Non-Technical pm", "Admin", "Non-Technical hr"],
        name: "NonTechnical",
        icon: <FilterBAndWIcon />,
        link: "/team/management/assignments/nontechnicalassignments",
      },
      // {
      //   name: 'Deleted Assignments',
      //   icon: <AccountCircleTwoToneIcon />,
      //   link: '/team/management/assignments/deletedassignments',
      // },
    ],
  },

  // {
  //   scope: [
  //     "Non-Technical pm",
  //     "Technical pm",
  //     "Admin",
  //     "Non-Technical hr",
  //     "Technical hr",
  //   ],
  //   name: "Marks Overview",
  //   icon: <BallotIcon />,
  //   submenu: true,
  //   sublinks: [
  //     {
  //       scope: [
  //         "Non-Technical pm",
  //         "Technical pm",
  //         "Admin",
  //         "Non-Technical hr",
  //         "Technical hr",
  //       ],
  //       name: "Marks Overview",
  //       icon: <BarChartIcon />,
  //       link: "/team/management/marks/marksoverview",
  //     },
  //   ],
  // },
  {
    scope: [
      "Non-Technical pm",
      "Technical pm",
      "Admin",
      "Non-Technical hr",
      "Technical hr",
    ],
    name: "Marks Table",
    icon: <BackupTableIcon />,
    link: "/team/management/marks/markstable",
  },
  {
    scope: [
      "Non-Technical pm",
      "Technical pm",
      "Admin",
      "Non-Technical hr",
      "Technical hr",
    ],
    name: "Freelancer",
    icon: <EngineeringIcon />,
    submenu: true,
    sublinks: [
      {
        scope: [
          "Non-Technical pm",
          "Technical pm",
          "Admin",
          "Non-Technical hr",
          "Technical hr",
        ],
        name: "All",
        icon: <SupervisedUserCircleIcon />,
        link: "/team/management/freelancers/allfreelancers",
      },
      {
        scope: [
          "Non-Technical pm",
          "Technical pm",
          "Admin",
          "Non-Technical hr",
          "Technical hr",
        ],
        name: "Approved",
        icon: <VerifiedUserIcon />,
        link: "/team/management/freelancers/approvedfreelancers",
      },
      //TODO: Not in pm panel
      {
        scope: ["Admin"],
        name: "Technical",
        icon: <AccessibilityIcon />,
        link: "/team/management/freelancers/technicalfreelancers",
      },
      //TODO: Not in pm panel
      {
        scope: ["Admin"],
        name: "Non Technical",
        icon: <AccessibleIcon />,
        link: "/team/management/freelancers/nontechnicalfreelancers",
      },
      // {
      //   name: 'Deleted Freelancers',
      //   icon: <AccountCircleTwoToneIcon />,
      //   link: '/team/management/freelancers/deletedfreelancers',
      // },
    ],
  },
  {
    scope: [
      "Non-Technical pm",
      "Technical pm",
      "Admin",
      "Non-Technical hr",
      "Technical hr",
    ],
    name: "Affiliates",
    submenu: true,
    icon: <SettingsAccessibilityIcon />,
    sublinks: [
      {
        scope: [
          "Non-Technical pm",
          "Technical pm",
          "Admin",
          "Non-Technical hr",
          "Technical hr",
          // "Brainheaters",
        ],
        name: "All Affiliates",
        link: "/team/management/affiliates/all-affiliates",
        icon: <ContactEmergencyIcon />,
      },
    ],
  },
  {
    scope: [
      "Non-Technical pm",
      "Technical pm",
      "Admin",
      "Non-Technical hr",
      "Technical hr",
    ],
    name: "Plagiarism",
    icon: <PlagiarismIcon />,
    submenu: true,
    sublinks: [
      {
        scope: [
          "Non-Technical pm",
          "Technical pm",
          "Admin",
          "Non-Technical hr",
          "Technical hr",
        ],
        name: "Existing User",
        icon: <PermContactCalendarIcon />,
        link: "/team/management/plagiarism/existinguser",
      },
      {
        scope: [
          "Non-Technical pm",
          "Technical pm",
          "Admin",
          "Non-Technical hr",
          "Technical hr",
        ],
        name: "New User",
        icon: <PersonAddIcon />,
        link: "/team/management/plagiarism/newuser",
      },
    ],
  },
  {
    scope: [
      "Non-Technical pm",
      "Technical pm",
      "Admin",
      "Non-Technical hr",
      "Technical hr",
    ],
    name: "Reward",
    icon: <EmojiEventsIcon />,
    submenu: true,
    sublinks: [
      {
        scope: [
          "Non-Technical pm",
          "Technical pm",
          "Admin",
          "Non-Technical hr",
          "Technical hr",
        ],
        name: "Reward Claims",
        icon: <CardGiftcardIcon />,
        link: "/team/management/rewards/rewardclaims",
      },
      {
        scope: [
          "Non-Technical pm",
          "Technical pm",
          "Admin",
          "Non-Technical hr",
          "Technical hr",
        ],
        name: "Reward Eligibility",
        icon: <ElevatorIcon />,
        link: "/team/management/rewards/rewardeligibility",
      },
      {
        scope: [
          "Non-Technical pm",
          "Technical pm",
          "Admin",
          "Non-Technical hr",
          "Technical hr",
        ],
        name: "Freelancer Ranking",
        icon: <WorkspacePremiumIcon />,
        link: "/team/management/rewards/freelancerranking",
      },
    ],
  },

  {
    scope: [
      "Non-Technical pm",
      "Technical pm",
      "Admin",
      "Non-Technical hr",
      "Technical hr",
    ],
    name: "Old Rewards",
    icon: <RedeemIcon />,
    submenu: true,
    sublinks: [
      {
        scope: [
          "Non-Technical pm",
          "Technical pm",
          "Admin",
          "Non-Technical hr",
          "Technical hr",
        ],
        name: "Old Reward Claims",
        icon: <CardGiftcardIcon />,
        link: "/team/management/oldrewards/oldrewardclaims",
      },
      {
        scope: [
          "Non-Technical pm",
          "Technical pm",
          "Admin",
          "Non-Technical hr",
          "Technical hr",
        ],
        name: "Old Reward Eligibility",
        icon: <ElevatorIcon />,
        link: "/team/management/oldrewards/oldrewardeligibility",
      },
      // {
      //   scope: [
      //     "Non-Technical pm",
      //     "Technical pm",
      //     "Admin",
      //     "Non-Technical hr",
      //     "Technical hr",
      //   ],
      //   name: "Old Freelancer Ranking",
      //   icon: <WorkspacePremiumIcon />,
      //   link: "/team/management/oldrewards/oldfreelancerranking",
      // },
    ],
  },
  {
    name: "PM",
    scope: ["Admin", "Non-Technical hr", "Technical hr"],
    icon: <AdminPanelSettingsIcon />,
    submenu: true,
    sublinks: [
      {
        scope: ["Admin", "Non-Technical hr", "Technical hr"],
        name: "All PMs",
        icon: <SupervisorAccountIcon />,
        link: "/team/management/pm/allpm",
      },
    ],
  },
  {
    scope: [
      "Non-Technical pm",
      "Technical pm",
      "Admin",
      "Non-Technical hr",
      "Technical hr",
    ],
    name: "Student",
    icon: <SentimentSatisfiedAltIcon />,
    submenu: true,
    sublinks: [
      {
        scope: [
          "Non-Technical pm",
          "Technical pm",
          "Admin",
          "Non-Technical hr",
          "Technical hr",
        ],
        name: "All Students",
        icon: <SwitchAccountIcon />,
        link: "/team/management/student/allstudent",
      },
      {
        scope: [
          "Non-Technical pm",
          "Technical pm",
          "Admin",
          "Non-Technical hr",
          "Technical hr",
        ],
        name: "SELECT Students",
        icon: <Crown />,
        link: "/team/management/student/selectstudents",
      },
      {
        scope: ["Non-Technical pm", "Technical pm", "Admin"],
        name: "Create Student",
        icon: <PersonAddIcon />,
        link: "/team/management/student/createstudent",
      },
      {
        scope: ["Non-Technical pm", "Technical pm", "Admin"],
        name: "Submit Assignment",
        icon: <AssignmentIcon />,
        link: "/team/management/student/assignment/assign-submit",
      },
    ],
  },

  {
    name: "HR",
    scope: ["Admin", "Non-Technical pm", "Technical pm"],
    icon: <SpaIcon />,
    submenu: true,
    sublinks: [
      {
        scope: ["Admin", "Non-Technical pm", "Technical pm"],
        name: "All HRs",
        icon: <SupervisorAccountIcon />,
        link: "/team/management/hr/allhr",
      },
    ],
  },

  {
    name: "Contact",
    scope: [
      "Non-Technical pm",
      "Technical pm",
      "Admin",
      "Non-Technical hr",
      "Technical hr",
    ],
    icon: <ConnectWithoutContactIcon />,
    submenu: true,
    link: "/team/management/contact/contactus",
  },
  {
    name: "Marketing",
    scope: [
      "Non-Technical pm",
      "Technical pm",
      "Admin",
      "Non-Technical hr",
      "Technical hr",
    ],
    icon: <CampaignIcon />,
    submenu: true,
    link: "/team/management/marketing/marketing-response",
  },
  // {
  //   name: 'Accounts',
  //   icon: <AccountCircleTwoToneIcon />,
  //   submenu: true,
  //   sublinks: [
  //     {
  //       name: 'User Profile',
  //       icon: <AccountCircleTwoToneIcon />,
  //       link: '/team/management/profile/details/123',
  //     },
  //     {
  //       name: ' Account Settings',
  //       icon: <AccountCircleTwoToneIcon />,
  //       link: '/team/management/profile/settings',
  //     },
  //   ],
  // },
];
