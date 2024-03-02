import { BsGiftFill, BsFillPersonFill } from "react-icons/bs";
import { BsBarChartSteps } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { MdAssignment, MdChat } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import SettingsIcon from "@mui/icons-material/Settings";
import FreelancerDashboard from "~/pages/FreelancerDashboard/Dashboard";
import Profile from "~/pages/FreelancerDashboard/Profile";
import Assignment from "~/pages/FreelancerDashboard/Assignment";
import MessagingFreelancer from "~/pages/FreelancerDashboard/MessagingFreelancer";
import ChangePassword from "~/pages/FreelancerDashboard/ChangePassword";
import ClaimRewards from "~/pages/FreelancerDashboard/ClaimRewards";
import Settings from "~/pages/FreelancerDashboard/Settings";
import ContactSupport from "~/pages/FreelancerDashboard/ContactSupport";
import Logout from "~/pages/FreelancerDashboard/Logout";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "freelancer/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: FreelancerDashboard,
    noCollapse: true,
  },
  { type: "title", title: "Assignments", key: "assignments-details" },
  {
    type: "collapse",
    name: "Assignment",
    key: "assignment",
    route: "freelancer/assignment",
    icon: <MdAssignment size="15px" color="inherit" />,
    component: Assignment,
    noCollapse: true,
  },

  // { type: "title", title: "Marks Overview", key: "marks-overview" },

  // {
  //   type: "collapse",
  //   name: "Marks Overview",
  //   key: "marks-overview",
  //   route: "freelancer/marksoverview",
  //   icon: <BsBarChartSteps size="15px" color="inherit" />,
  //   component: Profile,
  //   noCollapse: true,
  // },

  // { type: "title", title: "Chats", key: "chats-details" },

  // {
  //   type: "collapse",
  //   name: "Chats",
  //   key: "chats",
  //   route: "freelancer/chats",
  //   icon: <MdChat size="15px" color="inherit" />,
  //   component: MessagingFreelancer,
  //   noCollapse: true,
  // },
  { type: "title", title: "Account", key: "account-details" },

  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "freelancer/profile",
    icon: <BsFillPersonFill size="15px" color="inherit" />,
    component: Profile,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Change Password",
    key: "change-password",
    route: "freelancer/change-password",
    icon: <RiLockPasswordFill size="15px" color="inherit" />,
    component: ChangePassword,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "How to Claim Rewards",
    key: "how-to-claim-rewards",
    route: "freelancer/how-to-claim-rewards",
    icon: <BsGiftFill size="15px" color="inherit" />,
    component: ClaimRewards,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Settings",
    key: "settings",
    route: "freelancer/settings",
    icon: <SettingsIcon size="15px" color="inherit" />,
    component: Settings,
    noCollapse: true,
  },
  { type: "title", title: "Support", key: "support" },
  {
    type: "collapse",
    name: "Contact Support",
    key: "contact-support",
    route: "freelancer/contact-support",
    icon: <BiSupport size="15px" color="inherit" />,
    component: ContactSupport,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    route: "freelancer/logout",
    icon: <AiOutlineLogout size="15px" color="inherit" />,
    component: Logout,
    noCollapse: true,
  },
];

export default routes;
