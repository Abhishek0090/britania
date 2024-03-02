import { Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import SuspenseLoader from "~/components/SuspenseLoader";
import BaseLayout from "~/layout/BaseLayout";
//-----------------------Protected Routes-----------------------//
import ProtectedStudentRoutes from "~/utils/ProtectedStudentRoutes";

//-----------------------TeamPages-----------------------//
import SidebarLayoutTeam from "~/pages/TeamPages/layouts/SidebarLayoutTeam";
import TeamPages from "~/pages/TeamPages";
//-----------------------Pages-----------------------//
// import HomePage from "~/pages/Homepage";
import Contact from "~/pages/Contact";
import About from "~/pages/About";
import Terms from "~/pages/PolicyPages/Terms";
import Privacy from "~/pages/PolicyPages/Privacy";
import PaymentPolicy from "~/pages/PolicyPages/PaymentPolicy";
import RefundPolicy from "~/pages/PolicyPages/RefundPolicy";
import ChangesPolicy from "~/pages/PolicyPages/ChangesPolicy";
import RewardTerms from "~/pages/PolicyPages/RewardTerms";
//-----------------------Auth-----------------------//
import Login from "~/pages/Auth/Login";
import Signup from "~/pages/Auth/Signup";
import ForgotPasswordFreelancer from "~/pages/Auth/ForgotPassword/Freelancer";
import ForgotPasswordStudent from "~/pages/Auth/ForgotPassword/Student";
import ChangePasswordFreelancer from "~/pages/Auth/ChangePassword/Freelancer";
import ChangePasswordStudent from "~/pages/Auth/ChangePassword/Student";
import FreelanceLogin from "~/pages/Auth/FreelancerLogin";
import TeamLogin from "~/pages/Auth/TeamLogin";

//-----------------------FreelanceForm-----------------------//
import FreelanceForm from "~/pages/FreelanceForm/FreelanceForm";
import FreelanceFormTwo from "~/pages/FreelanceForm/FreelanceFormTwo";
import FreelanceFormThree from "~/pages/FreelanceForm/FreeLanceFormThree";

//Orders
import Orders from "~/pages/Orders";

//non logged plagiarism
import NonLoggedCheckout from "~/pages/Client/AssignmentSubmit/AllOtherAssignment/NonLoggedPlagiarism/Payment/Checkout";
import NonLoggedSuccess from "~/pages/Client/AssignmentSubmit/AllOtherAssignment/NonLoggedPlagiarism/Payment/Success";
import NonLoggedFailture from "~/pages/Client/AssignmentSubmit/AllOtherAssignment/NonLoggedPlagiarism/Payment/Failture";
import NonLoggedRedirect from "~/pages/Client/AssignmentSubmit/AllOtherAssignment/NonLoggedPlagiarism/Payment/Redirect";

//logged plagiarism
import Checkout from "~/pages/Client/AssignmentSubmit/AllOtherAssignment/Payment/Checkout";
import Success from "~/pages/Client/AssignmentSubmit/AllOtherAssignment/Payment/Success";
import Failture from "~/pages/Client/AssignmentSubmit/AllOtherAssignment/Payment/Failture";
import Redirect from "~/pages/Client/AssignmentSubmit/AllOtherAssignment/Payment/Redirect";
import BHPage from "~/pages/BHSection/BHPage";
import BHForm from "~/pages/BHSection/BHForm";

// Refferals
// import Referrals from "~/pages/Client/Referrals";

//-----------------------Loader-----------------------//
const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Home Page //

const HomePage = Loader(lazy(() => import("~/pages/Homepage")));

//-----------------------Layout-----------------------//
const SidebarLayout = Loader(lazy(() => import("~/layout/SidebarLayout")));

//-----------------------Writer-----------------------//

const NotFound = Loader(lazy(() => import("~/components/NotFound")));

// Technical

const StepOne = Loader(
  lazy(() => import("~/pages/FreelanceForm/Freelancer/Technical/StepOne"))
);
const StepTwo = Loader(
  lazy(() => import("~/pages/FreelanceForm/Freelancer/Technical/StepTwo"))
);
const StepThree = Loader(
  lazy(() => import("~/pages/FreelanceForm/Freelancer/Technical/StepThree"))
);

const PersonalDetails = Loader(
  lazy(() =>
    import("~/pages/FreelanceForm/Freelancer/Technical/PersonalDetails")
  )
);

//Non Technical

const StepOneNon = Loader(
  lazy(() => import("~/pages/FreelanceForm/Freelancer/NonTechnical/StepOne"))
);

const StepTwoNon = Loader(
  lazy(() => import("~/pages/FreelanceForm/Freelancer/NonTechnical/StepTwo"))
);

const StepThreeNon = Loader(
  lazy(() => import("~/pages/FreelanceForm/Freelancer/NonTechnical/StepThree"))
);

const PersonalDetailsNon = Loader(
  lazy(() =>
    import("~/pages/FreelanceForm/Freelancer/NonTechnical/PersonalDetails")
  )
);

const ClientDashboard = Loader(
  lazy(() => import("~/pages/Client/ClientDashboard"))
);
const AssignmentSubmit = Loader(
  lazy(() => import("~/pages/Client/AssignmentSubmit"))
);

const Messaging = Loader(lazy(() => import("~/pages/Messaging")));

// submit assignment
const AllOtherAssignment = Loader(
  lazy(() => import("~/pages/Client/AssignmentSubmit/AllOtherAssignment"))
);

const Programming = Loader(
  lazy(() =>
    import("~/pages/Client/AssignmentSubmit/AllOtherAssignment/Programming")
  )
);

const Professional = Loader(
  lazy(() =>
    import("~/pages/Client/AssignmentSubmit/AllOtherAssignment/Professional")
  )
);

const Academic = Loader(
  lazy(() =>
    import("~/pages/Client/AssignmentSubmit/AllOtherAssignment/Academic")
  )
);

const Plagiarism = Loader(
  lazy(() =>
    import("~/pages/Client/AssignmentSubmit/AllOtherAssignment/Plagiarism")
  )
);

const NonLoggedPlagiarism = Loader(
  lazy(() =>
    import(
      "~/pages/Client/AssignmentSubmit/AllOtherAssignment/NonLoggedPlagiarism"
    )
  )
);

//-----------------------Freelancer-----------------------//
const Dashboard = Loader(
  lazy(() => import("~/pages/FreelancerDashboard/Dashboard"))
);

// ------------------- Referral ----------------------- //
const AffiliateSystem = Loader(lazy(() => import("~/pages/Client/Affiliates")));

const routes = [
  {
    path: "",
    element: <BaseLayout />,

    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/freelancer/login",
        element: <FreelanceLogin />,
      },
      {
        path: "auth/team/login",
        element: <TeamLogin />,
      },
      {
        path: "auth/signup",
        element: <Signup />,
      },
      {
        path: "auth/forgot-password-user",
        element: <ForgotPasswordStudent />,
      },
      {
        path: "auth/forgot-password-freelancer",
        element: <ForgotPasswordFreelancer />,
      },

      {
        path: "auth/changepasswordfreelancer",
        element: <ChangePasswordFreelancer />,
      },
      {
        path: "auth/changepassworduser",
        element: <ChangePasswordStudent />,
      },
      {
        path: "submit",
        element: <AllOtherAssignment />,
      },
      {
        path: "submit/checkplagiarism",
        element: <NonLoggedPlagiarism />,
      },
      {
        path: "submit/checkplagiarism/checkout",
        element: <NonLoggedCheckout />,
      },
      {
        path: "submit/checkplagiarism/checkout/checkorderstatus",
        element: <NonLoggedRedirect />,
      },
      {
        path: "submit/checkplagiarism/checkout/success",
        element: <NonLoggedSuccess />,
      },
      {
        path: "submit/checkplagiarism/checkout/failure",
        element: <NonLoggedFailture />,
      },
      {
        path: "/plagreport",
        element: <Orders />,
      },

      {
        path: "/brainheaters",
        element: <BHPage />,
      },
      {
        path: "/brainheaters/form",
        element: <BHForm />,
      },
      {
        path: "/",
        element: <ProtectedStudentRoutes />,
        children: [
          {
            path: "dashboard",
            element: <ClientDashboard />,
          },
          {
            path: "affiliates",
            element: <AffiliateSystem />,
          },
          {
            path: "submit/programmingassignment",
            element: <Programming />,
          },
          {
            path: "submit/professionalwriting",
            element: <Professional />,
          },
          {
            path: "submit/academicwriting",
            element: <Academic />,
          },
          {
            path: "submit/plagiarism-check",
            element: <Plagiarism />,
          },
          {
            path: "submit/plagiarism-check/checkout",
            element: <Checkout />,
          },
          {
            path: "submit/plagiarism-check/checkout/checkorderstatus",
            element: <Redirect />,
          },
          {
            path: "submit/plagiarism-check/checkout/success",
            element: <Success />,
          },
          {
            path: "submit/plagiarism-check/checkout/failure",
            element: <Failture />,
          },
          {
            path: "chats",
            element: <Messaging />,
          },
        ],
      },

      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "payment-policy",
        element: <PaymentPolicy />,
      },
      {
        path: "changes-policy",
        element: <ChangesPolicy />,
      },
      {
        path: "refund-policy",
        element: <RefundPolicy />,
      },
      {
        path: "rewards-terms",
        element: <RewardTerms />,
      },
      {
        path: "freelance",
        element: <FreelanceForm />,
      },
      {
        path: "freelance/step2",
        element: <FreelanceFormTwo />,
      },
      {
        path: "freelance/step3",
        element: <FreelanceFormThree />,
      },
      {
        path: "freelance/freelancer/technical/step1",
        element: <StepOne />,
      },
      {
        path: "freelance/freelancer/technical/step2",
        element: <StepTwo />,
      },
      {
        path: "freelance/freelancer/technical/step3",
        element: <StepThree />,
      },
      {
        path: "freelance/freelancer/technical/personalDetails",
        element: <PersonalDetails />,
      },

      {
        path: "freelance/freelancer/nontechnical/step1",
        element: <StepOneNon />,
      },
      {
        path: "freelance/freelancer/nontechnical/step2",
        element: <StepTwoNon />,
      },
      {
        path: "freelance/freelancer/nontechnical/step3",
        element: <StepThreeNon />,
      },
      {
        path: "freelance/freelancer/nontechnical/personalDetails",
        element: <PersonalDetailsNon />,
      },
      {
        path: "assignment/submit",
        element: <AssignmentSubmit />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "team/*",
    element: <TeamPages />,

    children: [
      {
        path: "team/dashboards",
        element: <SidebarLayoutTeam />,
        children: [
          {
            path: "",
            element: <Navigate to="team/dashboards/tasks" replace />,
          },
        ],
      },
    ],
  },
  {
    path: "dashboard",
    element: <SidebarLayout />,
    children: [
      {
        path: "freelancer/dashboard",
        element: <Dashboard />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
