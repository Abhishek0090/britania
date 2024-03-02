import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedTeamsRoutes from "~/utils/ProtectedTeamsRoutes";
import SidebarLayoutTeam from "~/pages/TeamPages/layouts/SidebarLayoutTeam";

import SuspenseLoader from "~/pages/TeamPages/components/SuspenseLoader";
import Messaging from "./content/applications/Messaging";

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages

// Dashboards

const Tasks = Loader(
  lazy(() => import("~/pages/TeamPages/content/dashboards/Tasks"))
);

const BhDashboard = Loader(
  lazy(() => import("~/pages/TeamPages/content/dashboards/BhDashboard"))
);

// Applications

const Messenger = Loader(
  lazy(() => import("~/pages/TeamPages/content/applications/Messenger"))
);

const BrainHeaters = Loader(
  lazy(() => import("~/pages/TeamPages/content/applications/BrainHeaters"))
);

const BrainHeatersDetails = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/BrainHeaters/Details")
  )
);

//Marks and Reward System

const MarksOverview = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Marks/MarksOverview")
  )
);

const MarksTable = Loader(
  lazy(() => import("~/pages/TeamPages/content/applications/Marks/MarksTable"))
);

// assignments
const Details = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Assignments/Details")
  )
);
const AllAssignments = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Assignments/AllAssignments")
  )
);
const AllAssignmentsByFid = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Assignments/AllAssignments")
  )
);
const CompletedAssignments = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Assignments/Completed")
  )
);
const UnderProcessAssignments = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Assignments/UnderProcess")
  )
);
const ReviewedAssignments = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Assignments/Reviewed")
  )
);
const LostAssignments = Loader(
  lazy(() => import("~/pages/TeamPages/content/applications/Assignments/Lost"))
);
const AssignedFreeAssignments = Loader(
  lazy(() =>
    import(
      "~/pages/TeamPages/content/applications/Assignments/AssignedToFreeAssignments"
    )
  )
);
const AssignedPMAssignments = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Assignments/AssignedToPM")
  )
);

const DeletedAssignment = Loader(
  lazy(() =>
    import(
      "~/pages/TeamPages/content/applications/Assignments/DeletedAssignments"
    )
  )
);

const NonTechnicalAssignment = Loader(
  lazy(() =>
    import(
      "~/pages/TeamPages/content/applications/Assignments/NonTechnicalAssignments"
    )
  )
);
const TechnicalAssignment = Loader(
  lazy(() =>
    import(
      "~/pages/TeamPages/content/applications/Assignments/TechnicalAssignments"
    )
  )
);

//plagiarism
const ExistingUser = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Plagiarism/ExistingUser")
  )
);

const NewUser = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Plagiarism/NewUser")
  )
);

const NewUserDetails = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Plagiarism/NewUser/Details")
  )
);

// student
const AllStudents = Loader(
  lazy(() => import("~/pages/TeamPages/content/applications/Students"))
);

const CreateStudent = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Students/CreateStudent")
  )
);

const UserProfileStudent = Loader(
  lazy(() => import("~/pages/TeamPages/content/applications/Users/student"))
);

const SELECTStudentTable = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Students/SelectStudent")
  )
);

// Referrals

const AffiliateSystem = Loader(
  lazy(() => import("~/pages/TeamPages/content/applications/Affiliates"))
);

//student Assignment Submit

const AllOtherAssignment = Loader(
  lazy(() =>
    import(
      "~/pages/TeamPages/content/applications/Students/SubmitAssignment/AllOtherAssignment"
    )
  )
);
const Academic = Loader(
  lazy(() =>
    import(
      "~/pages/TeamPages/content/applications/Students/SubmitAssignment/AllOtherAssignment/Academic"
    )
  )
);
const Professional = Loader(
  lazy(() =>
    import(
      "~/pages/TeamPages/content/applications/Students/SubmitAssignment/AllOtherAssignment/Professional"
    )
  )
);
const Programming = Loader(
  lazy(() =>
    import(
      "~/pages/TeamPages/content/applications/Students/SubmitAssignment/AllOtherAssignment/Programming"
    )
  )
);

//pm

const AllPMs = Loader(
  lazy(() => import("~/pages/TeamPages/content/applications/PM"))
);

//hr
const AllHRs = Loader(
  lazy(() => import("~/pages/TeamPages/content/applications/HR"))
);

const UserProfilePM = Loader(
  lazy(() => import("~/pages/TeamPages/content/applications/Users/pm"))
);

const UserProfileHR = Loader(
  lazy(() => import("~/pages/TeamPages/content/applications/Users/hr"))
);

// freelancer
const ApprovedFreelancers = Loader(
  lazy(() =>
    import(
      "~/pages/TeamPages/content/applications/Freelancers/ApprovedFreelancers"
    )
  )
);
const AllFreelancers = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Freelancers/AllFreelancers")
  )
);
const TechnicalFreelancers = Loader(
  lazy(() =>
    import(
      "~/pages/TeamPages/content/applications/Freelancers/TechnicalFreelancers"
    )
  )
);

const NonTechnicalFreelancers = Loader(
  lazy(() =>
    import(
      "~/pages/TeamPages/content/applications/Freelancers/NonTechnicalFreelancers"
    )
  )
);

const DeletedFreelancers = Loader(
  lazy(() =>
    import(
      "~/pages/TeamPages/content/applications/Freelancers/DeletedFreelancers"
    )
  )
);

const UserProfileFreelancer = Loader(
  lazy(() => import("~/pages/TeamPages/content/applications/Users/freelancer"))
);
const UserSettings = Loader(
  lazy(() => import("~/pages/TeamPages/content/applications/Users/settings"))
);

// Rewards

const RewardsClaims = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Rewards/RewardClaims")
  )
);
const RewardEligibility = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Rewards/RewardEligibility")
  )
);

const FreelancerRanking = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/Rewards/FreelancerRanking")
  )
);

// OLD REWARDS

const OldRewardsClaims = Loader(
  lazy(() =>
    import("~/pages/TeamPages/content/applications/OldRewards/RewardClaims")
  )
);
const OldRewardEligibility = Loader(
  lazy(() =>
    import(
      "~/pages/TeamPages/content/applications/OldRewards/RewardEligibility"
    )
  )
);

const OldFreelancerRanking = Loader(
  lazy(() =>
    import(
      "~/pages/TeamPages/content/applications/OldRewards/FreelancerRanking"
    )
  )
);

// contact
const Contact = Loader(
  lazy(() => import("~/pages/TeamPages/content/applications/Contact"))
);

// marketing
const Marketing = Loader(
  lazy(() => import("~/pages/TeamPages/content/applications/Marketing"))
);
// Components

const Buttons = Loader(
  lazy(() => import("~/pages/TeamPages/content/pages/Components/Buttons"))
);
const Modals = Loader(
  lazy(() => import("~/pages/TeamPages/content/pages/Components/Modals"))
);
const Accordions = Loader(
  lazy(() => import("~/pages/TeamPages/content/pages/Components/Accordions"))
);
const Tabs = Loader(
  lazy(() => import("~/pages/TeamPages/content/pages/Components/Tabs"))
);
const Badges = Loader(
  lazy(() => import("~/pages/TeamPages/content/pages/Components/Badges"))
);
const Tooltips = Loader(
  lazy(() => import("~/pages/TeamPages/content/pages/Components/Tooltips"))
);
const Avatars = Loader(
  lazy(() => import("~/pages/TeamPages/content/pages/Components/Avatars"))
);
const Cards = Loader(
  lazy(() => import("~/pages/TeamPages/content/pages/Components/Cards"))
);
const Forms = Loader(
  lazy(() => import("~/pages/TeamPages/content/pages/Components/Forms"))
);

// Status

const Status404 = Loader(
  lazy(() => import("~/pages/TeamPages/content/pages/Status/Status404"))
);

const routes = [
  {
    path: "",
    element: <ProtectedTeamsRoutes />,
    children: [
      {
        path: "",
        element: <SidebarLayoutTeam />,
        children: [
          {
            path: "",
            element: <Navigate to="/team/dashboards/tasks" replace />,
          },
          {
            path: "dashboards",
            children: [
              {
                path: "tasks",
                element: <Tasks />,
              },
              {
                path: "overview",
                element: <BhDashboard />,
              },
              {
                path: "messenger",
                element: <Messenger />,
              },
              {
                path: "chats",
                element: <Messaging />,
              },
              {
                path: "brainheaters",
                element: <BrainHeaters />,
              },
              {
                path: "brainheaters/details/:id",
                element: <BrainHeatersDetails />,
              },
            ],
          },
          {
            path: "management",

            children: [
              {
                path: "marks",
                children: [
                  {
                    path: "marksoverview",
                    element: <MarksOverview />,
                  },
                  {
                    path: "markstable",
                    element: <MarksTable />,
                  },
                ],
              },
              {
                path: "assignments",
                children: [
                  {
                    path: "details/:id",
                    element: <Details />,
                  },
                  {
                    path: "allassignments",
                    element: <AllAssignments />,
                  },
                  {
                    path: "underprocess-assignments",
                    element: <UnderProcessAssignments />,
                  },
                  {
                    path: "reviewed-assignments",
                    element: <ReviewedAssignments />,
                  },
                  {
                    path: "lost-assignments",
                    element: <LostAssignments />,
                  },
                  {
                    path: "completed-assignments",
                    element: <CompletedAssignments />,
                  },
                  {
                    path: "allassignments/:id",
                    element: <AllAssignmentsByFid />,
                  },
                  {
                    path: "assignedassignmentsfreelancers",
                    element: <AssignedFreeAssignments />,
                  },
                  {
                    path: "assignedassignmentspm",
                    element: <AssignedPMAssignments />,
                  },
                  {
                    path: "technicalassignments",
                    element: <TechnicalAssignment />,
                  },
                  {
                    path: "nontechnicalassignments",
                    element: <NonTechnicalAssignment />,
                  },
                  {
                    path: "deletedassignments",
                    element: <DeletedAssignment />,
                  },
                ],
              },
              {
                path: "affiliates",
                children: [
                  {
                    path: "all-affiliates",
                    element: <AffiliateSystem />,
                  },
                ],
              },
              {
                path: "plagiarism",
                children: [
                  {
                    path: "",
                    element: (
                      <Navigate
                        to="/team/management/plagiarism/existinguser"
                        replace
                      />
                    ),
                  },
                  {
                    path: "existinguser",
                    element: <ExistingUser />,
                  },
                  {
                    path: "newuser",
                    element: <NewUser />,
                  },
                  {
                    path: "newuser/details/:id",
                    element: <NewUserDetails />,
                  },
                ],
              },
              {
                path: "student",
                children: [
                  {
                    path: "",
                    element: (
                      <Navigate to="/team/student/allstudents" replace />
                    ),
                  },
                  {
                    path: "allstudent",
                    element: <AllStudents />,
                  },
                  {
                    path: "selectstudents",
                    element: <SELECTStudentTable />,
                  },
                  {
                    path: "details-student/:id",
                    element: <UserProfileStudent />,
                  },
                  {
                    path: "assignment/assign-submit",
                    element: <AllOtherAssignment />,
                  },
                  {
                    path: "assignment/assign-submit/programming",
                    element: <Programming />,
                  },
                  {
                    path: "assignment/assign-submit/professional",
                    element: <Professional />,
                  },
                  {
                    path: "assignment/assign-submit/academic",
                    element: <Academic />,
                  },
                  {
                    path: "createstudent",
                    element: <CreateStudent />,
                  },
                ],
              },
              {
                path: "pm",
                children: [
                  {
                    path: "",
                    element: <Navigate to="/team/pm/allpm" replace />,
                  },
                  {
                    path: "allpm",
                    element: <AllPMs />,
                  },
                  {
                    path: "details-pm/:id",
                    element: <UserProfilePM />,
                  },
                ],
              },
              {
                path: "hr",
                children: [
                  {
                    path: "",
                    element: <Navigate to="/team/hr/allhr" replace />,
                  },
                  {
                    path: "allhr",
                    element: <AllHRs />,
                  },
                  {
                    path: "details-hr/:id",
                    element: <UserProfileHR />,
                  },
                ],
              },
              {
                path: "freelancers",
                children: [
                  {
                    path: "",
                    element: (
                      <Navigate to="/team/freelancers/allfreelancers" replace />
                    ),
                  },
                  {
                    path: "approvedfreelancers",
                    element: <ApprovedFreelancers />,
                  },
                  {
                    path: "allfreelancers",
                    element: <AllFreelancers />,
                  },
                  {
                    path: "technicalfreelancers",
                    element: <TechnicalFreelancers />,
                  },
                  {
                    path: "nontechnicalfreelancers",
                    element: <NonTechnicalFreelancers />,
                  },
                  {
                    path: "deletedfreelancers",
                    element: <DeletedFreelancers />,
                  },
                ],
              },
              {
                path: "profile",
                children: [
                  {
                    path: "",
                    element: <Navigate to="/team/details" replace />,
                  },
                  {
                    path: "details/:id",
                    element: <UserProfileFreelancer />,
                  },
                  {
                    path: "settings",
                    element: <UserSettings />,
                  },
                ],
              },
              {
                path: "rewards",
                children: [
                  {
                    path: "",
                    element: (
                      <Navigate to="/team/rewards/rewardclaims" replace />
                    ),
                  },
                  {
                    path: "rewardclaims",
                    element: <RewardsClaims />,
                  },
                  {
                    path: "rewardeligibility",
                    element: <RewardEligibility />,
                  },
                  {
                    path: "freelancerranking",
                    element: <FreelancerRanking />,
                  },
                ],
              },
              {
                path: "oldrewards",
                children: [
                  {
                    path: "",
                    element: (
                      <Navigate to="/team/oldrewards/oldrewardclaims" replace />
                    ),
                  },
                  {
                    path: "oldrewardclaims",
                    element: <OldRewardsClaims />,
                  },
                  {
                    path: "oldrewardeligibility",
                    element: <OldRewardEligibility />,
                  },
                  {
                    path: "oldfreelancerranking",
                    element: <OldFreelancerRanking />,
                  },
                ],
              },
              {
                path: "contact",
                children: [
                  {
                    path: "",
                    element: <Navigate to="/team/contact/contactus" replace />,
                  },
                  {
                    path: "contactus",
                    element: <Contact />,
                  },
                ],
              },
              {
                path: "marketing",
                children: [
                  {
                    path: "",
                    element: (
                      <Navigate
                        to="/team/marketing/marketing-response"
                        replace
                      />
                    ),
                  },
                  {
                    path: "marketing-response",
                    element: <Marketing />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
