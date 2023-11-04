import { lazy } from "react";
import { ADMINROLE, AGENTROLE } from "../helper/constructors";

// Home Dashbord
const Home = lazy(() => import("../page/home/Home"));

// Subjects
const Subjects = lazy(() => import("../page/subject/Subjects"));
// Sessions
const Sessions = lazy(() => import("../page/sessions/Sessions"));

// Lead Routes
const AddLead = lazy(() => import("../page/Lead/AddLead"));
const DataGrid = lazy(() => import("../components/DataGrid/DataGrid"));

// Email Template Routes
const EmailTemplate = lazy(() =>
  import("../page/template/EmailTemplateBuilder")
);
const EmailTemplateList = lazy(() =>
  import("../page/template/EmailTemplateList")
);
// User routes
const AllUsers = lazy(() => import("../page/users/AllUsers"));
const AddUser = lazy(() => import("../page/users/AddUser"));

// Accessories
const Accessories = lazy(() => import("../page/accesories/Accessories"));

// Settings
const Settings = lazy(() => import("../page/settings/Settings"));

// Auth Routes
const LoginPage = lazy(() => import("../page/auth/LoginPage"));

// Error Page
const NotFoundPage = lazy(() => import("../page/error/NotFoundPage"));

// Report
const BulkEntryReport = lazy(() =>
  import("../page/Report/components/BulkEntryReport")
);

// Messaging
const SmsReport = lazy(() => import("../page/messaging/SmsReporting"));
const EmailReport = lazy(() => import("../page/messaging/EmailReporting"));

// All Routing goes here
const userRoutes = [
  { path: "/", component: Home, access: AGENTROLE },
  { path: "/datagrid", component: DataGrid, access: AGENTROLE },
  {
    path: "/buildemailtemplate/:id",
    component: EmailTemplate,
    access: ADMINROLE,
  },
  { path: "/templatelist", component: EmailTemplateList, access: ADMINROLE },
  { path: "/settings", component: Settings, access: ADMINROLE },
  { path: "/addlead", component: AddLead, access: ADMINROLE },
  { path: "/bulkentryReport", component: BulkEntryReport, access: ADMINROLE },
  { path: "/subjects", component: Subjects, access: ADMINROLE },
  { path: "/msgdepartment", component: SmsReport, access: ADMINROLE },
  { path: "/maildepartment", component: EmailReport, access: ADMINROLE },
  { path: "/Sessions", component: Sessions, access: ADMINROLE },
  { path: "/allUsers", component: AllUsers, access: AGENTROLE },
  { path: "/accessories", component: Accessories, access: AGENTROLE },
  { path: "/adduser", component: AddUser, access: ADMINROLE },
  { path: "*", component: NotFoundPage },
];
const authRoutes = [{ path: "/login", component: LoginPage }];
export { userRoutes, authRoutes };
